<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item to="/userinfo"> Admin </b-breadcrumb-item>
      <b-breadcrumb-item active>Join Campaign</b-breadcrumb-item>
    </b-breadcrumb>
    <div class="card card-container p-4">
      <form name="form" @submit.prevent="handleAdd">
        <div>
          <div class="form-group">
            <label for="username">Join Code</label>
            <input
              v-model="title"
              type="text"
              class="form-control"
              name="title"
            />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Join Campaign</span>
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
let userid = getUserIdFromToken(getJwtToken());
let joincode = parseInt(this.title);
export default {
  name: "JoinCampaign",
  data() {
    return {
    };
  },
  methods: {
    handleAdd() {
      this.loading = true;
      this.message = "";
      Api.joinCampaign(joincode, userid)
        .then(() => {
          this.loading = false;
          this.$router.push("/userinfo");
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
};
</script>