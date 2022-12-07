<template>
  <div class="main-container">
    <h1>Gerenciar pedidos:</h1>
    <DashBoard />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import DashBoard from "@/components/DashBoard.vue";

export default defineComponent({
  name: "PedidosView",
  components: {
    DashBoard,
  },
});
</script>

<style scoped></style>
