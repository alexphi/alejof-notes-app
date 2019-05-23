<template>
    <div>
        <h1 v-if="loading">loading note...</h1>
        <h1 v-else>{{ entry.title }}</h1>

        <div
            v-if="loading"
            class="spinner-grow"
            role="status"
        >
            <span class="sr-only">Loading...</span>
        </div>

        <p class="small" v-if="isLink">
            {{ entry.source }}
        </p>

        <div class="view-content">
            <vue-simple-markdown :source="entry.content" />
        </div>

        <p v-if="entry.type">
            <a
                href="#"
                @click.prevent="publish"
                class="btn btn-sm btn-outline-secondary"
            >publish entry</a>
            &nbsp;or
            <a
                href="#"
                @click.prevent="edit"
                class="command-link"
            >edit it</a>.
        </p>
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
            return this.entry.type === Constants.EntryTypes.LINK
                ? "a link"
                : "text";
        }
    },

    async mounted() {
        if (this.noteId) {
            const url = `notes/${this.noteId}`;

            try {
                const response = await this.$http.get(url);
                this.entry = response.data;
                this.loading = false;
            } catch (error) {
                this.entry = {
                    title: "",
                    type: "",
                    slug: "",
                    content: "",
                    source: ""
                };
                console.error(error);
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
        }
    }
};
</script>

<style>
.markdown-body {
    white-space: pre-wrap;
}

blockquote {
    border-left: solid 5px #687c94;
    padding-left: 15px;
    font-style: italic;
}
</style>
