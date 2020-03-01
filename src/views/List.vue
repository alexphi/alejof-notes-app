<template>
  <div class="h-full flex flex-col justify-start">
    <div class="flex flex-row justify-between items-end px-4 py-5 md:mt-5">
      <router-link to="/" class="flex items-end no-underline">
        <svg viewBox="0 -1 401.52289 401" class="w-10 md:w-16 ml-3" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"
          />
          <path
            d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"
          />
        </svg>

        <h1 class="text-4xl ml-4 hidden md:inline">Notes app</h1>
      </router-link>
      <div class="pb-2 text-sm text-gray-600">
        <span class="my-0">Logged in as {{ nickname }}</span>
        <a href="#" class="ml-4 font-narrow" @click.prevent="logout">Logout</a>
      </div>
    </div>
    <div class="flex-grow md:border md:pt-3 border-gray-300 md:my-5 md:rounded md:shadow">
      <div class="flex flex-row justify-between border-b pl-3">
        <ul class="flex">
          <li class="mr-2">
            <a
              class="inline-block py-2 px-4 font-narrow border-gray-600"
              :class="published ? '' : 'border-b-4'"
              href="#"
              @click.prevent="viewPublished(false)"
            >Drafts</a>
          </li>
          <li class="mr-2">
            <a
              class="inline-block py-2 px-4 font-narrow border-gray-600"
              :class="published ? 'border-b-4' : ''"
              href="#"
              @click.prevent="viewPublished(true)"
            >Published</a>
          </li>
        </ul>
        <router-link to="/new" class="inline-block py-2 px-4 font-narrow border-gray-600">New entry</router-link>
      </div>

      <transition>
        <div v-if="!published" key="drafts">
          <draft-list :published="false"></draft-list>
        </div>

        <div v-else key="notes">
          <published-list :published="true"></published-list>
        </div>
      </transition>
    </div>

    <div class="py-5 px-4 text-right border-t border-gray-300 md:hidden">
      <router-link to="/new" class="font-narrow">New entry</router-link>
    </div>
  </div>
</template>

<script>
import Vuex from "vuex";
import NoteList from "@/components/notes/List.vue";

export default {
  name: "list",
  data() {
    return {
      published: false
    };
  },
  computed: {
    nickname() {
      return this.authData ? this.authData.profile.nickname : "unknown";
    },
    ...Vuex.mapState(["isLoggedIn", "isNotAllowed", "authData", "headerType"])
  },

  components: {
    "draft-list": NoteList,
    "published-list": NoteList
  },

  methods: {
    viewPublished(value) {
      this.published = value;
    },

    logout() {
      this.$auth.logOut();
    }
  }
};
</script>
