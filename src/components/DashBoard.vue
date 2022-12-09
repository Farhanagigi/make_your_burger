<template>
  <div v-show="msgupdate" class="center_message">
    <MessaGe :msg="msgupdate" v-show="msgupdate" />
  </div>
  <div id="burger-table">
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Accões:</div>
      </div>
    </div>
    <div id="burger-table-rows">
      <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
        <div class="order-number">{{ burger.id }}</div>
        <div>{{ burger.nome }}</div>
        <div>{{ burger.pao }}</div>
        <div>{{ burger.carne }}</div>
        <div>
          <ul>
            <li v-for="(opcional, index) in burger.opcionais" :key="index">
              {{ opcional }}
            </li>
          </ul>
        </div>
        <div>
          <select
            name="status"
            id="status"
            @change="updateBurger($event, burger.id)"
          >
            <option value="">Selecione</option>
            <option
              v-for="s in status"
              :key="s.id"
              :selected="burger.status == s.tipo"
              :value="s.tipo"
            >
              {{ s.tipo }}
            </option>
          </select>
          <!-- ======================== -->
          <button class="delete-btn" @click="deleteBurger(burger.id)">
            <div @click="isModalOpen = true">Cancelar</div>
          </button>
          <!--========================= -->
          <Teleport to="#modal">
            <transition name="modal">
              <div class="modal-bg" v-if="isModalOpen">
                <div class="modal">
                  <button class="close-btn" @click="isModalOpen = false">
                    X
                  </button>
                  {{ msg }}
                </div>
              </div>
            </transition>
          </Teleport>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import MessaGe from "./MessaGe.vue";
import axios from "axios";
import { ref } from "vue";

export default defineComponent({
  name: "DashBoard",
  data() {
    return {
      burgers: null,
      burgers_id: null,
      status: [],
      isModalOpen: ref(false),
      msg: null,
      msgupdate: null,
    };
  },
  components: {
    MessaGe,
  },
  methods: {
    async getPedidos() {
      const req = await axios.get("http://localhost:3000/burgers");

      /* const data = await req.json(); */

      this.burgers = req.data;

      //resgatar o status
      this.getStatus();
    },
    async getStatus() {
      const res = await axios.get("http://localhost:3000/status");

      this.status = res.data;
    },

    async deleteBurger(id) {
      await axios.delete(`http://localhost:3000/burgers/${id}`);

      // msg
      this.getPedidos();
      this.msg = `O seu pedido Nº ${id} foi removido com sucesso`;

      //timeout para pop da mensagem
      setTimeout(() => {
        this.isModalOpen = false;
      }, 4000);
    },

    async updateBurger(event, id) {
      //const option = event.target.value; //qual o sattus que o usuario selecionou

      const req = await axios.patch(`http://localhost:3000/burgers/${id}`, {
        status: event.target.value,
      });

      //actualizar a tablea
      this.getPedidos();
      console.log(req.data);

      //colocar uma mensagem de sistema
      this.msgupdate = `Pedido Nº ${req.data.id} alterado com sucesso!!`;

      //limpar a mensagem
      setTimeout(() => {
        this.msgupdate = "";
      }, 3000);
    },
  },
  mounted() {
    this.getPedidos();
  },
});
</script>

<style scoped>
#burger-table {
  max-width: 1200px;
  margin: 0 auto;
}

#burger-table-heading,
#burger-table-rows,
.burger-table-row {
  display: flex;
  flex-wrap: wrap;
}

#burger-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}

#burger-table-heading div,
.burger-table-row div {
  width: 19%;
}

.burger-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ccc;
}

#burger-table-heading .order-id,
.burger-table-row .order-number {
  width: 5%;
}

select {
  padding: 12px 6px;
  margin-right: 12px;
}

.delete-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
}

.delete-btn:hover {
  transition: 0.5s;
  background-color: transparent;
  color: #222;
}

.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;

  background: white;
  padding: 50px 100px;
  border-radius: 5px;
  box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
}

.modal .close-btn {
  position: absolute;
  top: 10px;
  right: 10px;

  background: whitesmoke;
  border: none;
  cursor: pointer;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.center_message {
  color: #004085;
  background-color: #cce5ff;
  border: 2px solid #b8daff;
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  margin: 30px auto;
}
</style>
