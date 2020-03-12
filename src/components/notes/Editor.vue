<template>
  <div class="flex flex-col justify-start h-full">
    <div class="flex-grow px-4 py-5 md:mt-5">
      <h1 class="text-2xl">
        <input
          type="text"
          class="w-full appearance-none focus:outline-none"
          :placeholder="loading ? 'loading note...' : 'a catchy title'"
          v-model="entry.title"
        />
      </h1>

      <p class="text-sm text-gray-600" v-show="entry.title">
        this will be a [
        <a v-if="!isText" href="#" @click.prevent="setText" class="font-narrow">text</a>
        <strong v-else>text</strong>
        &bull;
        <a v-if="!isLink" href="#" @click.prevent="setLink" class="font-narrow">link</a>
        <strong v-else>link</strong>
        ] note.
      </p>

      <div v-show="entry.type" class="my-5">
        <textarea
          placeholder="what do I want it to be? (show some markdown love)"
          class="w-full appearance-none resize-none focus:outline-none"
          name="content"
          rows="3"
          v-model="entry.content"
          ref="contentInput"
        ></textarea>
      </div>
    </div>
    <div v-if="isLink" class="px-4 py-5">
      <p class="mb-1 text-gray-600">Source:</p>
      <input
        type="text"
        class="w-full appearance-none focus:outline-none"
        name="source"
        placeholder="where did I see it?"
        v-model="entry.source"
      />
    </div>
    <div
      class="flex flex-row justify-between px-4 py-5 border-t border-gray-300 md:px-8 md:border md:shadow md:-mx-8 md:mb-4 md:rounded-lg"
    >
      <a href="#" @click.prevent="deleteNote" class="font-narrow">{{ deleteText }}</a>

      <div class="inline-block">
        <a href="#" v-if="entry.type" @click.prevent="save(true)" class="ml-4 font-narrow">preview</a>
        <a href="#" @click.prevent="save(false)" class="ml-4 font-narrow">go back</a>
      </div>
    </div>
  </div>
</template>

<script>
import slugify from "slugify";
import Constants from "@/constants";

export default {
  props: {
    noteId: {
      type: String,
      default: "",
      required: false
    }
  },
  data() {
    return {
      loading: true,
      entry: {
        title: "",
        type: "",
        slug: "",
        content: "",
        source: ""
      }
    };
  },
  computed: {
    isText() {
      return this.entry.type === Constants.EntryTypes.TEXT;
    },
    isLink() {
      return this.entry.type === Constants.EntryTypes.LINK;
    },
    deleteText() {
      return this.noteId ? "delete" : "discard";
    },

    slug: {
      get() {
        return (
          this.entry.slug ||
          slugify(this.entry.title, {
            remove: /[*+~.()'"!:@]/g
          }).toLowerCase()
        );
      },
      set(value) {
        this.entry.slug = value;
      }
    }
  },

  async mounted() {
    if (this.noteId) {
      const url = `notes/${this.noteId}`;

      try {
        const response = await this.$http.get(url);
        const note = response.data;

        this.entry = {
          title: note.title,
          slug: note.slug,
          content: note.content,
          type: note.data.Type,
          source: note.data.Source
        };
      } catch (error) {
        this.entry = {
          title: "",
          type: "",
          slug: "",
          content: "",
          source: ""
        };
        console.error(error);
      } finally {
        this.loading = false;
      }
    } else {
      this.loading = false;
    }
  },
  updated() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been re-rendered
      this.autoExpand();
    });
  },

  methods: {
    setText() {
      this.entry.type = Constants.EntryTypes.TEXT;
    },
    setLink() {
      this.entry.type = Constants.EntryTypes.LINK;
    },

    async save(previewAfterSave) {
      // as a minimum, ensure a note has a title
      if (!this.entry.title) {
        this.$emit(Constants.Events.ENTRY_SAVED);
        return;
      }

      this.entry.slug = this.slug;

      let url = "notes";
      let method = "post";

      if (this.noteId) {
        url = `notes/${this.noteId}`;
        method = "put";
      }

      try {
        const payload = {
          title: this.entry.title,
          slug: this.entry.slug,
          content: this.entry.content,
          data: {
            Type: this.entry.type,
            Source: this.entry.source
          }
        };

        const response = await this.$http.request({
          url,
          method,
          data: payload
        });

        let id = this.noteId;
        if (!id && response.data.success) {
          id = response.data.noteId;
        }

        if (previewAfterSave) {
          this.$emit(Constants.Events.ENTRY_PREVIEW, id);
        } else {
          this.$emit(Constants.Events.ENTRY_SAVED);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async deleteNote() {
      if (!this.noteId) {
        this.$emit(Constants.Events.ENTRY_SAVED);
        return;
      }

      if (!confirm("Are you sure?")) return;

      const url = `notes/${this.noteId}`;

      try {
        await this.$http.delete(url);
        this.$emit(Constants.Events.ENTRY_SAVED);
      } catch (error) {
        console.error(error);
      }
    },

    autoExpand() {
      const field = this.$refs.contentInput;

      // Reset field height
      field.style.height = "inherit";

      const computed = window.getComputedStyle(field);
      const height =
        parseInt(computed.getPropertyValue("border-top-width"), 10) +
        parseInt(computed.getPropertyValue("padding-top"), 10) +
        field.scrollHeight +
        parseInt(computed.getPropertyValue("padding-bottom"), 10) +
        parseInt(computed.getPropertyValue("border-bottom-width"), 10);

      field.style.height = height + "px";
    }
  }
};
</script>
