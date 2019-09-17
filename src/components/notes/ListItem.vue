<template>
    <div class="list-group-item hover-trigger">
        <div class="d-flex w-100 justify-content-between">
            <p class="mb-0"><strong>
                    <router-link
                        v-if="!published"
                        :to="'/view/' + id"
                    >{{ title }}</router-link>
                    <span v-else>{{ title }}</span>
                </strong></p>
            <p class="mb-0">{{ dateText }}</p>
        </div>
        <div class="d-flex w-100 justify-content-between">
            <p>{{ typeText }} <span
                    class="text-muted"
                    v-if="showSource"
                >{{ source }}</span></p>
            <small class="hover-commands">
                <template v-if="!published">
                    <router-link
                        :to="'/edit/' + id"
                        class="command-link"
                    >edit</router-link> &bull;
                    <a
                        href="#"
                        @click.prevent="deleteEntry"
                        class="command-link"
                    >delete</a>
                </template>
                <template v-else>
                    <a
                        href="#"
                        @click.prevent="unpublishEntry"
                        class="command-link"
                    >unpublish</a>
                </template>
            </small>
        </div>
    </div>
</template>

<script>
import Constants from "@/constants";

export default {
    props: {
        id: {
            type: String,
            default: "",
            required: true
        },
        type: {
            type: String,
            default: "",
            required: false
        },
        title: {
            type: String,
            default: "",
            required: false
        },
        source: {
            type: String,
            default: "",
            required: false
        },
        dateText: {
            type: String,
            default: "",
            required: false
        },
        published: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    computed: {
        typeText() {
            return this.type === Constants.EntryTypes.LINK
                ? "a link to"
                : "some text";
        },
        showSource() {
            return this.type === Constants.EntryTypes.LINK;
        }
    },

    methods: {
        async deleteEntry() {
            if (!confirm("Are you sure?")) return;

            try {
                const url = `notes/${this.id}`;
                await this.$http.delete(url);

                this.$emit(Constants.Events.ENTRY_DELETED, this.id);
            } catch (error) {
                console.error(error);
            }
        },
        async unpublishEntry() {
            if (!confirm("Are you sure?")) return;

            try {
                const url = `publish/${this.id}`;
                await this.$http.delete(url);

                this.$emit(Constants.Events.ENTRY_DELETED, this.id);
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>
