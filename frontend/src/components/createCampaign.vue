<!--Created on 3/3/2022 by The Great Gonzales-->
<template>
    <div class="col-md-12">
        <div class="card card-container">
            <form name="form" @submit.prevent="createCampaign">
                <div>
                    <div class="form-group">
                        <label for="campaignName">Campaign Name</label>
                        <input v-model="campaignName"
                               type="text"
                               class="form-control"
                               name="campaignName" />
                    </div>
                    <div>
                        <label for="joinCode">Join Code</label>
                        <input v-model="joinCode"
                               type="number"
                               class="form-control"
                               name="joinCode" />
                    </div>
                    <br>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block" :disabled="loading">
                            <span v-show="loading"
                                  class="spinner-border spinner-border-sm"></span>
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
    import { getJwtToken, getUserIdFromToken } from "../auth";
    export default {
        name: "createCampaign",
        data() {
            return {
                campaignName: "",
                joinCode: 0,
                campaignId: "",
                loading: false,
                message: "",
            };
        },
        methods: {
            createCampaign() {
                this.message = "";
                this.loading = true;
                this.campaignId = this.campaignName + getUserIdFromToken(getJwtToken()); //Unsure about this, may need revision

                Api.createCampaign(this.campaignId, this.joinCode, this.campaignName) //campaingId may be faulty, look in to it.
                    .then(() => {
                        this.$router.push("/userinfo").catch((error) => {
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