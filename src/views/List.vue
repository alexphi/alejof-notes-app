<template>
    <div>
        <transition
            name="component-fade"
            mode="out-in">
            <div v-if="!published">
                <div class="d-flex w-80 justify-content-between">
                    <h1>drafts</h1>
                    <h1 class="text-muted">
                        <a href="#" @click.prevent="viewPublished(true)"><i class="fas fa-angle-double-right"></i>&nbsp;<span class="d-none d-sm-inline">published</span></a>
                    </h1>
                </div>

                <div class="view-content">
                    <draft-list :published="false"></draft-list>
                </div>
            </div>

            <div v-else>
                <div class="d-flex w-80 justify-content-between">
                    <h1 class="text-muted">
                        <a href="#" @click.prevent="viewPublished(false)"><span class="d-none d-sm-inline">drafts</span>&nbsp;<i class="fas fa-angle-double-left"></i></a>
                    </h1>
                    <h1>published</h1>
                </div>

                <div class="view-content">
                    <published-list :published="true"></published-list>
                </div>
            </div>
        </transition>

        <p>
            <router-link
                to="/new"
                class="btn btn-sm btn-outline-secondary"
            >create a new entry</router-link>
            &nbsp;or&nbsp;
            <router-link
                to="/"
                class="command-link"
            >go back</router-link>.
        </p>
    </div>
</template>

<script>
import NoteList from '@/components/notes/List.vue'

export default {
    data() {
        return {
            published: false,
        }
    },

    components: {
        'draft-list': NoteList,
        'published-list': NoteList,
    },

    methods: {
        viewPublished(value) {
            this.published = value;
        }
    }
};
</script>
