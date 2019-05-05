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

        <div class="view-content">
            <div v-show="entry.type" class="form">
                <div class="form-group">
                    <input type="text" name="slug" placeholder="slug" v-model="slug" />
                </div>
                <div v-if="!isText" class="form-group">
                    <input type="text" placeholder="source" v-model="entry.source" />
                </div>
                <div class="form-group">
                    <textarea placeholder="content (markdown ftw!)" v-model="entry.content"></textarea>
                </div>
            </div>
        </div>

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
            loading: false,
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
            this.loading = true;
            this.entry.title = `Note ${this.noteId}`;
        }
    },

    methods: {
        setText()  { this.entry.type = Constants.EntryTypes.TEXT; },
        setLink()  { this.entry.type = Constants.EntryTypes.LINK; },
        setQuote() { this.entry.type = Constants.EntryTypes.QUOTE; },

        save() {
            // TODO: Save data

            this.$emit('saved');
        }
    }
}
</script>
