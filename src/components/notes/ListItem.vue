<template>
    <div class="list-group-item hover-trigger">
        <div class="d-flex w-100 justify-content-between">
            <p class="mb-0"><strong>note title</strong></p>
            <p class="mb-0">3 days ago</p>
        </div>
        <div class="d-flex w-100 justify-content-between">
            <small>{{typeText}} <span class="text-muted" v-if="source">{{source}}</span></small>
            <small class="hover-commands">
                <template v-if="!published">
                    <router-link :to="'/edit/' + id" class="command-link">edit</router-link> &bull;
                    <a href="#" class="command-link">delete</a>
                </template>
                <template v-else>
                    <a href="#" class="command-link">unpublish</a>
                </template>
            </small>
        </div>
    </div>
</template>

<script>
import Constants from '@/constants'

export default {
    props: {
        id: {
            type: Number,
            default: 0,
            required: true
        },
        type: {
            type: String,
            default: '',
            required: true
        },
        source: {
            type: String,
            default: '',
            required: false
        },
        published: {
            type: Boolean,
            default: false,
            required: true,
        }
    },
    computed: {
        typeText() {
            return this.type === Constants.EntryTypes.QUOTE ?
                'a quote from'
                : this.type === Constants.EntryTypes.LINK ?
                    'a link from'
                    : 'some text';
        }
    }
};
</script>
