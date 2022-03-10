<template>
  <div class="col-md-12">
    <div class="card card-container">
      <form name="form" @submit.prevent="createCharacter">
        <div>
          <div class="form-group">
            <label for="username">Name</label>
            <input
              v-model="name"
              type="text"
              class="form-control"
              name="name"
            />
          </div>
          <div class="form-group">
            <label for="ac">AC</label>
            <input
              v-model="ac"
              type="number"
              class="form-control"
              name="ac"
            />
          </div>
          <div class="form-group">
            <label for="hp">HP</label>
            <input
              v-model="hp"
              type="number"
              class="form-control"
              name="hp"
            />
          </div>
          <div class="form-group">
            <label for="level">Level</label>
            <input
            v-model="level"
            type="number"
            class="form-control"
            name="level"
            />
          </div>
          <div>
            <label for="initiativeBonus">Initiative Bonus</label>
            <input
            v-model="initiativeBonus"
            type="number"
            class="form-control"
            name="initiativeBonus"
            />
          </div>
          <br>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Create</span>
            </button>
          </div>
        </div>

      </form>

      <div v-if="message" class="alert alert-danger">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../api";
export default {
  name: "createCharacter",
  data() {
    return {
      name: "",
      ac: 0,
      hp: 0,
      level: 0,
      initiativeBonus: 0,
      campaignCode: 0,
      loading: false,
      message: "",
    };
  },
  methods: {
    createCharacter() {
      this.message = "";
      this.loading = true;

   Api.createCharacter(this.ac, this.hp, this.initiativeBonus, this.name, this.level)
    .then(()=>{
      this.$router.push("/").catch((error) => {
          console.log(error);
          if (error.response) {
            this.message = error.response.data.message;
          }
          this.loading = false;
        });
    })
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>