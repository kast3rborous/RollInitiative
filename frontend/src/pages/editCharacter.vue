<template>
  <div>
    <div v-if="loading">Loading character...</div>
    <div v-else class="card card-container p-4">
      <form name="form" @submit.prevent="handleSave">
        <div>
          <div class="form-group">
            <label for="username">Character Name</label>
            <input
              v-model="character.charactername"
              type="text"
              class="form-control"
              name="id"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="username">AC</label>
            <input
              v-model="character.ac"
              type="text"
              class="form-control"
              name="title"
            />
          </div>
          <div class="form-group">
            <label for="content">HP</label>
            <textarea
              v-model="character.hp"
              class="form-control"
              name="content"
              rows="20"
            />
          </div>
          <div class="form-group">
            <label for="content">Level</label>
            <textarea
              v-model="character.level"
              class="form-control"
              name="content"
              rows="20"
            />
          </div>
          <div class="form-group">
            <label for="content">Initiative</label>
            <textarea
              v-model="character.initiative"
              class="form-control"
              name="content"
              rows="20"
            />
          </div>
          <div class="form-group">
            <label for="content">initiativeBonus</label>
            <textarea
              v-model="character.initiativebonus"
              class="form-control"
              name="content"
              rows="20"
            />
          </div>
          
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="saving">
              <span
                v-show="saving"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Save</span>
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
  name: "CharacterEdit",
  data: function () {
    return {
      loading: false,
      saving: false,
      character: null,
    };
  },
  methods: {
    getCharacterDetail() {
      this.loading = true;
      Api.returnCharacter(this.$route.params.id).then((res) => {
        this.character = res.data[0];
        this.loading = false;
      });
    },
    handleSave() {
      this.saving = true;
      Api.updateCharacter(this.character)
        .then(() => {
          this.saving = false;
          this.$router.push(`/campaignDetails/${this.character.campaignid}`);
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            this.message = error.response.data.message;
          }
          this.loading = false;
        });
    },
  },
  created: function () {
    this.getCharacterDetail();
  },
};
</script>