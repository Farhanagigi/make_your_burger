<template>
  <NavBar :logo="logo_src" :alt="app_name" />
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
  data() {
    return {
      logo_src: "/img/logo.png",
      app_name: "Make Your Burger",
    };
  },
});
</script>
<style>
/*fazer reset do estilo que o browser coloca */
* {
  font-family: Helvetica;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.main-container {
  margin: 50px;
  min-height: 250px;
}

h1 {
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #222;
}
</style>
