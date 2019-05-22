<template>
    <div>
        <note-editor
            :noteId="noteId"
            @saved="exit"
            @preview="previewNote"
        >
        </note-editor>
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
            this.$router.push(`/view/${noteId}`);
        }
    }
};
</script>
