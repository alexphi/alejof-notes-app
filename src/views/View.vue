<template>
  <div class="h-full">
    <note-viewer :noteId="noteId" :published="published" @saved="exit" @edit="editNote"></note-viewer>
  </div>
</template>

<script>
import NoteViewer from "@/components/notes/Viewer.vue";

export default {
  name: "preview",
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
  components: {
    NoteViewer
  },

  methods: {
    exit() {
      this.$router.push("/list");
    },
    editNote(noteId) {
      // prevent edit for published notes
      if (this.published) return;

      this.$router.push(`/edit/drafts/${noteId}`);
    }
  }
};
</script>
