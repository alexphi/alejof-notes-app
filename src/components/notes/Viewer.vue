<template>
  <div class="h-full flex flex-col justify-start">
    <div class="flex-grow py-5 px-4 md:mt-5">
      <h1 class="text-2xl" v-if="loading">loading note...</h1>
      <h1 class="text-2xl leading-tight" v-else>{{ entry.title }}</h1>

      <div v-if="loading" class="spinner-grow" role="status">
        <span class="sr-only">Loading...</span>
      </div>

      <a
        :href="entry.source"
        target="_blank"
        class="text-gray-600 text-sm"
        v-if="isLink"
      >{{ entry.source }}</a>

      <div class="my-5">
        <vue-simple-markdown :source="entry.content" />
      </div>
    </div>
    <div
      class="py-5 px-4 md:px-8 border-t md:border border-gray-300 md:shadow md:-mx-8 md:mb-4 md:rounded-lg flex flex-row justify-between"
    >
      <a href="#" @click.prevent="publish" class="font-narrow">publish entry</a>
      <div class="inline-block">
        <a href="#" @click.prevent="goBack" class="ml-4 font-narrow">go back</a>
        <a href="#" @click.prevent="edit" class="ml-4 font-narrow">edit it</a>
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
    async publish() {
      if (!confirm("Are you sure?")) return;

      const url = `publish/${this.noteId}`;

      try {
        await this.$http.post(url);

        this.$emit(Constants.Events.ENTRY_SAVED, this.noteId);
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

<style>
.markdown-body {
  white-space: pre-wrap;
}

.markdown-body img {
  max-width: 80%;
  max-height: 300px;
}
</style>
