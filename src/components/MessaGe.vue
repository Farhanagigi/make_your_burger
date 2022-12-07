<template>
  <div class="message-container">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "MessaGe",
  props: {
    msg: String,
  },
});
</script>

<style scoped>
.message-container {
  color: #222;
}
</style>
