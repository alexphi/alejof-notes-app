<template>
  <div>
    <div class="spinner-grow" role="status" v-if="loading">
      <span class="sr-only">Loading...</span>
    </div>
    <ul>
      <list-item
        v-for="item in items"
        :key="item.id"
        :type="item.data.Type"
        :source="item.data.Source"
        :published="published"
        v-bind="item"
        @deleted="onDeleted"
      ></list-item>
    </ul>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";

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
      items: [],
      loading: true
    };
  },

  async mounted() {
    const url = `notes?published=${this.published}`;

    try {
      const response = await this.$http.get(url);
      this.items = response.data;
      this.loading = false;
    } catch (error) {
      this.items = [];
      console.error(error);
    }
  },

  methods: {
    onDeleted(noteId) {
      const index = this.items.findIndex(i => i.id === noteId);

      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }
  }
};
</script>
