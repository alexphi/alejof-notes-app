<template>
    <div>
        <p class="header-img">
            <img src="https://blob.alejof.dev/assets/code-icon-light.png">
        </p>
        <div class="d-flex w-80 justify-content-between">
            <h1>drafts</h1>
            <h1 class="text-muted">
                <router-link to="/published"><i class="fas fa-angle-double-right"></i>&nbsp;<span class="d-none d-sm-inline">published</span></router-link>
            </h1>
        </div>

        <div class="view-content">
            <note-list :published="false"></note-list>
        </div>

        <p>
            <router-link
                to="/editor"
                class="btn btn-sm btn-outline-secondary"
            >create a new entry</router-link>
            &nbsp;or <router-link
                to="/"
                class="command-link"
            >go back</router-link>.
        </p>
    </div>
</template>

<script>
import NoteList from '@/components/notes/List.vue'

export default {
    components: {
        NoteList
    }
};
</script>
