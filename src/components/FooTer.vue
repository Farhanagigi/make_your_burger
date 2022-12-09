<template>
  <footer id="footer">
    <p>Make Your Burger &copy; 2022</p>
    <p>.Farhan Agigi</p>
  </footer>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "FooTer",
});
</script>

<style scoped>
#footer {
  height: 200px;
  background-color: #222;
  border-top: 4px solid #111;
  color: #fcba04;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  bottom: 0;
}
</style>
