<template>
    <div>
        <p class="header-img">
            <img src="https://blob.alejof.dev/assets/code-icon-light.png">
        </p>
        <h1><input type="text" placeholder="a catchy title" /></h1>
        <p class="small">
            this will be
            <a href="#" class="command-link">plain text</a> &bull;
            <a href="#" class="command-link">a link</a> &bull;
            <a href="#" class="command-link">a quote</a>
        </p>

        <div class="view-content">
            <textarea placeholder="content goes here" class="form-control"></textarea>
        </div>

        <hr />
        <p>
            <router-link to="/drafts" class="command-link">i'm done</router-link>.
        </p>
    </div>
</template>

<script>
export default {

}
</script>
