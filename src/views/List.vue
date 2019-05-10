<template>
    <div>
        <transition
            name="slide-fade"
            mode="out-in"
        >
            <div
                v-if="!published"
                key="drafts"
            >
                <div class="d-flex w-80 justify-content-between">
                    <h1>drafts</h1>
                    <h2 class="text-muted view-link">
                        <a
                            href="#"
                            @click.prevent="viewPublished(true)"
                        ><i class="fas fa-angle-double-right"></i>&nbsp;<span class="d-none d-sm-inline">published</span></a>
                    </h2>
                </div>

                <div class="view-content">
                    <draft-list :published="false"></draft-list>
                </div>
            </div>

            <div
                v-else
                key="notes"
            >
                <div class="d-flex w-80 justify-content-between">
                    <h1>published</h1>
                    <h2 class="text-muted view-link">
                        <a
                            href="#"
                            @click.prevent="viewPublished(false)"
                        ><i class="fas fa-angle-double-right"></i>&nbsp;<span class="d-none d-sm-inline">drafts</span></a>
                    </h2>
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
        </p>
    </div>
</template>

<script>
import NoteList from "@/components/notes/List.vue";

export default {
    name: "list",
    data() {
        return {
            published: false
        };
    },

    components: {
        "draft-list": NoteList,
        "published-list": NoteList
    },

    methods: {
        viewPublished(value) {
            this.published = value;
        }
    }
};
</script>

<style>
h2.view-link > a {
    margin-top: 5px;
    display: inline-block;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.2s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(100px);
    opacity: 0;
}

.slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(-100px);
    opacity: 0;
}
</style>
