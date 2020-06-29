<template>
    <zen-flex align="center" 
      justify="center" 
      class="app-loader"
      aria-label="Loader"
      :style="{ height: height }"
      >
        <span class="sr-only">Loading</span>
        <zen-spinner></zen-spinner>
    </zen-flex>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: "100vh"
    }
  }
}
</script>