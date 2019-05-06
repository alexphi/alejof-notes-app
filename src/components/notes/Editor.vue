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
                <input type="text" name="source" placeholder="where did I see it?" v-model="entry.source" />
            </div>
            <div class="form-group">
                <label class="small" for="content">content</label>
                <textarea placeholder="Stuff with some markdown love" name="content" v-model="entry.content" rows='3'></textarea>
            </div>
        </div>
        <div v-else class="view-content"></div>

        <p>
            <a v-if="entry.type" href="#" @click.prevent="save" class="btn btn-sm btn-outline-secondary">done</a>
            <router-link v-else to="/list" class="command-link">go back</router-link>
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

        slug: {
            get() {
                return this.entry.slug || slugify(this.entry.title, { remove: /[*+~.()'"!:@]/g });
            },
            set(value) {
                this.entry.slug = value
            }
        }
    },

    mounted() {
        if (this.noteId) {
            // TODO: Load data
            this.entry.title = `Note ${this.noteId}`;
        }

        this.loading = false;
    },

    methods: {
        setText()  { this.entry.type = Constants.EntryTypes.TEXT; },
        setLink()  { this.entry.type = Constants.EntryTypes.LINK; },
        setQuote() { this.entry.type = Constants.EntryTypes.QUOTE; },

        save() {
            // TODO: Save data

            this.$emit(Constants.Events.ENTRY_SAVED, this.noteId);
        }
    }
}
</script>
