<template>
    <div class="list-group-item hover-trigger">
        <div class="d-flex w-100 justify-content-between">
            <p class="mb-0"><strong>note title</strong></p>
            <p class="mb-0">3 days ago</p>
        </div>
        <div class="d-flex w-100 justify-content-between">
            <small>{{type}} <span class="text-muted" v-if="source">{{source}}</span></small>
            <small class="hover-commands">
                <template v-if="!published">
                    <a href="#" class="command-link">edit</a> &bull;
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
export default {
    props: {
        type: String,
        source: String,
        published: Boolean
    }
};
</script>
