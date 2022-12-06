<template>
  <BanNer />
  <div class="main-container">
    <h1>Monte o seu Burger:</h1>
    <p>Formulario</p>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import BanNer from "../components/BanNer.vue";
export default defineComponent({
  name: "HomeView",
  components: {
    BanNer,
  },
});
</script>
