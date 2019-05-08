<template>
    <div>
        <note-viewer
            :noteId="noteId"
            @saved="exit">
        </note-viewer>
        <p>
            <router-link
                to="/list"
                class="command-link"
            >go back</router-link>.
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
        }
    }
};
</script>
