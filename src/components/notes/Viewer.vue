<template>
    <div>
        <h1>
            <a v-if="isLink" :href="entry.source" target="_blank">{{ entry.title }}</a>
            <span v-else>{{ entry.title }}</span>
        </h1>
        <p class="small">
            {{ entry.slug }}
        </p>

        <div v-if="loading" class="spinner-grow" role="status">
            <span class="sr-only">Loading...</span>
        </div>

        <div class="view-content">
            <template v-if="isQuote">
                <blockquote>
                    <vue-simple-markdown :source="entry.content" />
                </blockquote>

                <small>
                    <vue-simple-markdown :source="entry.source" />
                </small>
            </template>
            <template v-else>
                <vue-simple-markdown :source="entry.content" />
            </template>
        </div>

        <p>
            <a v-if="entry.type" href="#" @click.prevent="publish" class="btn btn-sm btn-outline-secondary">publish entry</a>
        </p>
    </div>
</template>

<script>
import Constants from '@/constants'

export default {
    props: {
        noteId: {
            type: String,
            default: '',
            required: true,
        }
    },
    data() {
        return {
            loading: true,
            entry: {
                title: '',
                type: '',
                slug: '',
                content: '',
                source: ''
            }
        };
    },
    computed: {
        isText()  { return this.entry.type === Constants.EntryTypes.TEXT; },
        isLink()  { return this.entry.type === Constants.EntryTypes.LINK; },
        isQuote() { return this.entry.type === Constants.EntryTypes.QUOTE; },

        typeText() {
            if (!this.entry) return '';
            return this.entry.type === Constants.EntryTypes.QUOTE ?
                'a quote'
                : this.entry.type === Constants.EntryTypes.LINK ?
                    'a link'
                    : 'text';
        }
    },

    async mounted() {
        if (this.noteId) {
            const url = `drafts/${this.noteId}`;

            try {
                const response = await this.$http.get(url);
                this.entry = response.data;
                this.loading = false;
            }
            catch (error) {
                this.entry = {
                    title: '',
                    type: '',
                    slug: '',
                    content: '',
                    source: ''
                };
                console.error(error);
            }
        } else {
            this.loading = false;
        }
    },

    methods: {
        async publish() {
            const url = `publish/${this.noteId}`;

            try {
                await this.$http.post(url);

                this.$emit(Constants.Events.ENTRY_SAVED, this.noteId);
            }
            catch (error) {
                console.error(error);
            }
        },
    }
}
</script>
