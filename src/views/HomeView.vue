<template>
  <BanNer />
  <div class="main-container">
    <h1>Monte o seu Burger:</h1>
    <FormuLario />
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import BanNer from "../components/BanNer.vue";
import FormuLario from "../components/FormuLario.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    BanNer,
    FormuLario,
  },
});
</script>
