<template>
  <form id="burger-form" @submit="createBurger">
    <div class="input-container">
      <label for="nome">Nome do Cliente:</label>
      <input
        type="text"
        id="nome"
        name="nome"
        v-model="nome"
        placeholder="Digite o seu nome"
      />
    </div>

    <div class="input-container">
      <label for="pao">Escolha o pão:</label>
      <select id="pao" name="pao" v-model="pao">
        <option value="">Selecione o seu pão</option>
        <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
          {{ pao.tipo }}
        </option>
      </select>
    </div>

    <div class="input-container">
      <label for="carne">Escolha a carne do seu Burger:</label>
      <select id="carne" name="carne" v-model="carne">
        <option value="">Selecione o tipo de carne</option>
        <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
          {{ carne.tipo }}
        </option>
      </select>
    </div>

    <div id="opcionais-container" class="input-container">
      <label id="opcionais-title" for="opcionais"
        >Selecione os opcionais:</label
      >
      <div
        class="checkbox-container"
        v-for="opcional in opcionaisdata"
        :key="opcional.id"
      >
        <input
          type="checkbox"
          name="opcionais"
          v-model="opcionais"
          :value="opcional.tipo"
        />
        <span>{{ opcional.tipo }}</span>
      </div>

      <div class="input-container">
        <button @click="isModalOpen = true">
          <input type="submit" class="submit-btn" value="Criar meu Burger!" />
        </button>
      </div>
    </div>
  </form>
  <div>
    <Teleport to="#modal">
      <transition name="modal">
        <div class="modal-bg" v-if="isModalOpen">
          <div class="modal">
            <button class="close-btn" @click="isModalOpen = false">X</button>
            <img
              class="img1"
              src="../../public/img/ok-good.png"
              alt="Correct"
              v-show="msg"
            />
            <MessaGe :msg="msg" v-show="msg" />
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";
import MessaGe from "./MessaGe.vue";
import { ref } from "vue";

export default defineComponent({
  name: "FormuLario",
  components: {
    MessaGe,
  },
  data() {
    return {
      //dados que vem do servidor para prencher os combo box ele faz o fetch
      paes: null,
      carnes: null,
      opcionaisdata: null,

      //dados que o cliente requisita ou faz pedidos
      nome: null,
      pao: null,
      carne: null,
      opcionais: [],
      msg: null,
      isModalOpen: ref(false),
    };
  },
  methods: {
    async getIngredientes() {
      const req = await fetch("http://localhost:3000/ingredientes");

      const data = await req.json();

      this.paes = data.paes;
      this.carnes = data.carnes;
      this.opcionaisdata = data.opcionais;
    },
    async createBurger(e) {
      e.preventDefault();

      const data = {
        nome: this.nome,
        carne: this.carne,
        pao: this.pao,
        opcionais: Array.from(this.opcionais),
        status: "Solicitado",
      };

      const result = await axios.post("http://localhost:3000/burgers", {
        data,
      });

      //colocar uma mensagem de sistema
      this.msg = `Pedido Nº ${result.data.id} realizado com sucesso!!`;

      //limpar a mensagem
      setTimeout(() => {
        this.isModalOpen = false;
      }, 5000);

      //limpar os campos
      this.nome = "";
      this.carne = "";
      this.pao = "";
      this.opcionais = "";

      console.log(result.data);
    },
  },
  mounted() {
    this.getIngredientes();
  },
});
</script>

<style scoped>
#burger-form {
  max-width: 400px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #fcba03;
}

input,
select {
  padding: 5px 10px;
  width: 300px;
}

#opcionais-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

#opcionais-container {
  flex-direction: row;
  flex-wrap: wrap;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}

.img1 {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
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
</style>
