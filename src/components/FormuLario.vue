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
        <option v-for="carne in carnes" :key="carne.id" value="carne.tipo">
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
        <input type="submit" class="submit-btn" value="Criar meu Burger!" />
      </div>
    </div>
  </form>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";

export default defineComponent({
  name: "FormuLario",
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

      //limpar a mensagem

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
  padding: 5px, 10px;
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
</style>
