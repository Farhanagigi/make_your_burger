<template>
  <nav>
    <router-link to="/">
      <img src="" id="logo" />
    </router-link>

    <router-link to="/">Home</router-link> |
    <router-link to="/PedidosView">Pedidos</router-link>
  </nav>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "NavBar",
});
</script>

<style lang="scss" scoped></style>
