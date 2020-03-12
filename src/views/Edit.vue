<template>
  <div class="h-full">
    <note-editor :noteId="noteId" :published="published" @saved="exit" @preview="previewNote"></note-editor>
  </div>
</template>

<script>
import NoteEditor from "@/components/notes/Editor.vue";

export default {
  name: "edit",
  props: {
    noteId: {
      type: String,
      default: "",
      required: false
    },
    published: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  components: {
    NoteEditor
  },

  methods: {
    exit() {
      this.$router.push("/list");
    },
    previewNote(noteId) {
      this.$router.push(`/view/drafts/${noteId}`);
    }
  }
};
</script>
