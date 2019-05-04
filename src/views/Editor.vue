<template>
    <div>
        <p class="header-img">
            <img src="https://blob.alejof.dev/assets/code-icon-light.png">
        </p>
        <h1><input type="text" placeholder="a catchy title" v-model="entry.title"/></h1>
        <p class="small" v-show="entry.title">
            this will be a [
            <a v-if="!isText" href="#" @click.prevent="setText" class="command-link">plain text</a>
            <strong v-else>plain text</strong>
            &bull;
            <a v-if="!isLink" href="#" @click.prevent="setLink" class="command-link">link</a>
            <strong v-else>link</strong>
            &bull;
            <a v-if="!isQuote" href="#" @click.prevent="setQuote" class="command-link">quote</a>
            <strong v-else>quote</strong>
            ] note.
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
            <router-link v-else to="/drafts" class="command-link">go back</router-link>
        </p>
    </div>
</template>

<script>
import slugify from 'slugify'
import Constants from '@/constants'

export default {
    data() {
        return {
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

    methods: {
        setText()  { this.entry.type = Constants.EntryTypes.TEXT; },
        setLink()  { this.entry.type = Constants.EntryTypes.LINK; },
        setQuote() { this.entry.type = Constants.EntryTypes.QUOTE; },

        save() {
            this.$router.push('/drafts');
        }
    }
}
</script>
