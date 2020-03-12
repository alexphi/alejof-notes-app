<template>
  <div class="flex flex-col justify-start h-full">
    <div class="flex-grow px-4 py-5 md:mt-5">
      <h1 class="text-2xl" v-if="loading">loading note...</h1>
      <h1 class="text-2xl leading-tight" v-else>{{ entry.title }}</h1>

      <a
        :href="entry.source"
        target="_blank"
        class="text-sm text-gray-600"
        v-if="isLink"
      >{{ entry.source }}</a>

      <div class="my-5">
        <VueShowdown :markdown="entry.content" />
      </div>
    </div>
    <div
      class="flex flex-row justify-between px-4 py-5 border-t border-gray-300 md:px-8 md:border md:shadow md:-mx-8 md:mb-4 md:rounded-lg"
    >
      <a href="#" @click.prevent="move" class="font-narrow">{{ moveText }}</a>
      <div class="inline-block">
        <a href="#" @click.prevent="edit" class="ml-4 font-narrow">edit</a>
        <a href="#" @click.prevent="goBack" class="ml-4 font-narrow">go back</a>
      </div>
    </div>
  </div>
</template>

<script>
import Constants from "@/constants";

export default {
  props: {
    noteId: {
      type: String,
      default: "",
      required: true
    },
    published: {
      type: Boolean,
      default: false,
      required: true
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

    typeText() {
      if (!this.entry) return "";
      return this.entry.type === Constants.EntryTypes.LINK ? "a link" : "text";
    },
    moveText() {
      return this.published ? "unpublish" : "publish";
    }
  },

  async mounted() {
    if (this.noteId) {
      const url = `notes/${this.noteId}?published=${this.published}`;

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

  methods: {
    async move() {
      if (!confirm("Are you sure?")) return;

      const url = `publish/${this.noteId}`;

      try {
        if (this.published) await this.$http.delete(url);
        else await this.$http.post(url);

        this.goBack();
      } catch (error) {
        console.error(error);
      }
    },
    edit() {
      this.$emit(Constants.Events.ENTRY_EDIT, this.noteId);
    },
    goBack() {
      this.$emit(Constants.Events.ENTRY_SAVED, this.noteId);
    }
  }
};
</script>
