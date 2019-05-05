<template>
    <note-editor
        :noteId="noteId"
        @saved="exit"
    ></note-editor>
</template>

<script>
import NoteEditor from "@/components/notes/Editor.vue";

export default {
    props: {
        noteId: {
            type: String,
            default: "",
            required: false
        }
    },
    components: {
        NoteEditor
    },

    methods: {
        exit() {
            this.$router.push("/list");
        }
    }
};
</script>
