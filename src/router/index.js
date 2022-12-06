import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PedidosView from "../views/PedidosView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/pedidosview",
    name: "PedidosView",
    component: PedidosView /*"../views/PedidosView.vue")*/,
    /* component: () =>
      import(/* webpackChunkName: "PedidosView" */
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
