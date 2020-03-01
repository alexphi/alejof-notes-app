<template>
  <a
    class="bg-transparent no-underline hover:bg-gray-500 text-gray-700 font-narrow hover:text-white py-2 px-8 border border-gray-500 hover:border-transparent rounded-full"
    href="#"
    @click.prevent="click"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>
