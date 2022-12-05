<template>
  <NavBar />
  <router-view />
  <FooTer />
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import NavBar from "./components/Navbar.vue";
import FooTer from "./components/FooTer.vue";

export default defineComponent({
  components: {
    NavBar,
    FooTer,
  },
});
</script>
<style></style>
