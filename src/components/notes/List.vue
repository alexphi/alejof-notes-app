<template>
    <div class="list-group">
        <list-item type="plain text" :published="published"></list-item>
        <list-item type="a link to" source="google.com" :published="published"></list-item>
        <list-item type="a quote from" source="myself" :published="published"></list-item>
    </div>
</template>

<script>
import ListItem from './ListItem.vue'

export default {
    components: {
        ListItem
    },
    props: {
        published: Boolean
    }
};
</script>
