<template>
    <div>
        <template v-if="isLoggedIn">
            <note-list></note-list>
        </template>
    </div>
</template>

<script>
import Vuex from "vuex";
import NoteList from '@/components/notes/NoteList.vue'

export default {
    name: "home",
    components: {
        NoteList
    },
    computed: {
        ...Vuex.mapState(["isLoggedIn"])
    }
};
</script>
