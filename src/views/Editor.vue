<template>
    <div>
        <p class="header-img">
            <img src="https://blob.alejof.dev/assets/code-icon-light.png">
        </p>
        <h1><input type="text" placeholder="a catchy title" v-model="title"/></h1>
        <p class="small" v-show="title">
            this will be
            <a href="#" class="command-link">plain text</a> &bull;
            <a href="#" class="command-link">a link</a> &bull;
            <a href="#" class="command-link">a quote</a>
        </p>

        <div class="view-content">
            <textarea v-show="title" placeholder="content goes here" class="form-control"></textarea>
        </div>

        <p>
            <router-link v-if="title" to="/drafts" class="btn btn-sm btn-outline-secondary">done</router-link>
            <router-link v-else to="/drafts" class="command-link">go back</router-link>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: ''
        };
    }
}
</script>
