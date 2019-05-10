<template>
    <div>
        <note-viewer
            :noteId="noteId"
            @saved="exit"
            @edit="editNote"
        >
        </note-viewer>
        <p>
            <router-link
                to="/list"
                class="command-link"
            ><i class="fas fa-long-arrow-alt-left"></i>&nbsp;go back</router-link>
        </p>
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
            this.$router.push(`/edit/${noteId}`);
        }
    }
};
</script>
