<template>
    <div>
        <h1><input type="text" :placeholder="loading ? 'loading note' : 'a catchy title'" v-model="entry.title"/></h1>

        <div v-if="loading" class="spinner-grow" role="status">
            <span class="sr-only">Loading...</span>
        </div>

        <p class="small" v-show="entry.title">
            this will be a [
            <a v-if="!isText" href="#" @click.prevent="setText" class="command-link">plain text</a>
            <strong v-else>text note</strong>
            &bull;
            <a v-if="!isLink" href="#" @click.prevent="setLink" class="command-link">link</a>
            <strong v-else>link</strong>
            &bull;
            <a v-if="!isQuote" href="#" @click.prevent="setQuote" class="command-link">quote</a>
            <strong v-else>quote</strong>
            ].
        </p>

        <div v-if="entry.type" class="form">
            <div class="form-group">
                <label class="small" for="slug">slug</label>
                <input type="text" name="slug" placeholder="slug" v-model="slug" />
            </div>

            <div v-if="!isText" class="form-group">
                <label class="small" for="source">source</label>
                <input type="text" name="source" :placeholder="sourcePlaceholder" v-model="entry.source" />
            </div>

            <div class="form-group">
                <label class="small" for="content">content</label>
                <textarea
                    placeholder="Stuff with some markdown love"
                    name="content"
                    rows='3'
                    v-model="entry.content"
                    @input="autoExpand"
                    ref="contentInput"></textarea>
            </div>
        </div>
        <div v-else class="view-content"></div>

        <p>
            <a v-if="entry.type" href="#" @click.prevent="save" class="btn btn-sm btn-outline-secondary">done</a>
        </p>
    </div>
</template>

<script>
import slugify from 'slugify'
import Constants from '@/constants'

export default {
    props: {
        noteId: {
            type: String,
            default: '',
            required: false,
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

        sourcePlaceholder() {
            return this.isLink ? 'where did I see it? (link only)' : 'where is this from? (markdown, baby!)';
        },

        slug: {
            get() {
                return this.entry.slug || slugify(this.entry.title, { remove: /[*+~.()'"!:@]/g }).toLowerCase();
            },
            set(value) {
                this.entry.slug = value
            }
        }
    },

    async mounted() {
        if (this.noteId) {
            const url = `drafts/${this.noteId}`;

            try {
                const response = await this.$http.get(url);
                this.entry = response.data;
                this.loading = false;

                // fix content input height
                this.autoExpand();
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
        setText()  { this.entry.type = Constants.EntryTypes.TEXT; },
        setLink()  { this.entry.type = Constants.EntryTypes.LINK; },
        setQuote() { this.entry.type = Constants.EntryTypes.QUOTE; },

        async save() {
            this.entry.slug = this.slug;

            let url = 'drafts'
            let method = 'post'

            if (this.noteId) {
                url = `drafts/${this.noteId}`;
                method = 'put'
            }

            try {
                await this.$http.request({
                    url,
                    method,
                    data: this.entry,
                });

                this.$emit(Constants.Events.ENTRY_SAVED, this.noteId);
            }
            catch (error) {
                console.error(error);
            }
        },

        autoExpand() {
            var field = this.$refs.contentInput;

            // Reset field height
            field.style.height = 'inherit';

            var computed = window.getComputedStyle(field);
            var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                + parseInt(computed.getPropertyValue('padding-top'), 10)
                + field.scrollHeight
                + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

            field.style.height = height + 'px';
        }
    }
}
</script>
