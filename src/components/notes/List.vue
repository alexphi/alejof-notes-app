<template>
    <div class="list-group">
        <list-item
            v-for="item in items"
            v-bind="item"
            :key="item.id"
            @deleted="onDeleted"
            @unpublished="onUnpublished"
        ></list-item>
    </div>
</template>

<script>
import ListItem from "./ListItem.vue";

// test data
import items from "@/data/items.json";

export default {
    components: {
        ListItem
    },
    props: {
        published: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    data() {
        return {
            items: []
        };
    },

    mounted() {
        // TODO: Load data
        this.items = items.filter(i => i.published === this.published);
    },

    methods: {
        onDeleted(noteId) {
            const index = this.items.findIndex(i => i.id === noteId);

            if (index !== -1) {
                this.items.splice(index, 1);
            }
        },
        onUnpublished(noteId) {
            const index = this.items.findIndex(i => i.id === noteId);

            if (index !== -1) {
                this.items.splice(index, 1);
            }
        }
    }
};
</script>
