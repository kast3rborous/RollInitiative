<template>
  <div class="col-md-12">
    <div class="card card-container">
      <form name="form" @submit.prevent="createEncounter">
        <div>
          <div class="form-group">
            <label for="monstername">Name</label>
            <input
              v-model="name"
              type="text"
              class="form-control"
              name="name"
            />
          </div>
          <div>
           <select class="form-control" @click="addMonsterName($event)">
            <option value="" selected disabled>Choose</option>
            <option v-for="monster in monsters" :value="monster.monsterid" :key="monster.id">{{ monster.monstername }}</option>
          </select>
          </div>
          <br>
              <div>
      <p>Monsters:</p>
      <ul>
        <li v-for="monster in encountermonstersname" :key="monster">{{monster}}</li>
      </ul>

    </div>
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
import { getJwtToken, getUserIdFromToken } from '../auth';
export default {
  name: "createEncounter",
  data() {
    return {
      name: "",
      monsters:[],
      encountermonstersid:[],
      encountermonstersname: [],
      loading: false,
      message: "",
    };
  },
      created: function(){
      Api.getMonsters(getUserIdFromToken(getJwtToken())).then((res)=>{
          this.monsters=res.data
   })
      },
  methods: {
    createEncounter() {
      this.message = "";
      this.loading = true;

    },
    addMonsterName (event) {
      if (event.target.options[event.target.options.selectedIndex].text != "Choose"){
      this.encountermonstersname.push(event.target.options[event.target.options.selectedIndex].text);
      this.encountermonstersid.push(event.target.options[event.target.options.selectedIndex].value);
      }
    }
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