<template>
    <div class="list-group">
        <list-item v-for="item in items" :key="item.id" v-bind="item"></list-item>
    </div>
</template>

<script>
import ListItem from './ListItem.vue'

// test data
import items from '@/data/items.json'

export default {
    components: {
        ListItem
    },
    props: {
        published: {
            type: Boolean,
            default: false,
            required: false,
        }
    },
    data() {
        return {
            items: []
        }
    },

    mounted() {
        // TODO: Load data
        this.items = items.filter(
            i => i.published === this.published);
    }
};
</script>
