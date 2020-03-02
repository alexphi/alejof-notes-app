<template>
  <li class="border-b border-gray-300">
    <router-link
      :to="viewRoute"
      class="m-px p-4 flex flex-row justify-between no-underline hover:bg-gray-100"
    >
      <div class="flex-grow mx-2">
        <p class="mb-0">
          <strong>{{ title }}</strong>
        </p>
        <p class="mb-0 text-gray-600">
          {{ typeText }}
          <span class="text-blue-600" v-if="showSource">{{ sourceDomain }}</span>
        </p>
      </div>
      <div class="text-gray-500 self-center">
        <svg viewBox="0 0 20 20" fill="currentColor" class="w-6">
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </router-link>
  </li>
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
    },
    sourceDomain() {
      if (!this.showSource) return "";

      const matches = this.source.match(
        /\b(?:https?:\/\/|www\.)([^ \f\n\r\t\v\]/]+)\b/
      );
      return matches[1];
    },
    viewRoute() {
      const segment = this.published ? "published" : "drafts";
      return `/view/${segment}/${this.id}`;
    }
  }
};
</script>
