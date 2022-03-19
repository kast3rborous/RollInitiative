<!--Created on 3/19/2022 by The Great Gonzales-->
<template>
    <div>
        <div v-if="loading">Loading monster...</div>
        <div v-else class="card card-container p-4">
            <form name="form" @submit.prevent="handleSave">
                <div>
                    <div class="form-group">
                        <label for="username">Monster Name</label>
                        <input v-model="monster.monstername"
                               type="text"
                               class="form-control"
                               name="id" />
                    </div>
                    <div class="form-group">
                        <label for="username">AC</label>
                        <input v-model="monster.ac"
                               type="text"
                               class="form-control"
                               name="title" />
                    </div>
                    <div class="form-group">
                        <label for="content">CR</label>
                        <textarea v-model="monster.cr"
                                  class="form-control"
                                  name="content" />
                    </div>
                    <div class="form-group">
                        <label for="content">initiativeBonus</label>
                        <textarea v-model="monster.initiativebonus"
                                  class="form-control"
                                  name="content" />
                    </div>
                    <div class="form-group">
                        <label for="content">Private</label>
                        <textarea v-model="monster.public"
                                  type="checkbox"
                                  class="form-control"
                                  name="content" />
                    </div>

                    <div class="form-group">
                        <button class="btn btn-primary btn-block" :disabled="saving">
                            <span v-show="saving"
                                  class="spinner-border spinner-border-sm"></span>
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
        name: "MonsterEdit",
        data: function () {
            return {
                loading: false,
                saving: false,
                monster: null,
            };
        },
        methods: {
            getMonsterDetail() {
                this.loading = true;
                Api.returnMonster(this.$route.params.id).then((res) => {
                    this.monster = res.data[0];
                    this.loading = false;
                });
            },
            handleSave() {
                this.saving = true;
                Api.updateMonster(this.monster)
                    .then(() => {
                        this.saving = false;
                        this.$router.push(`/userinfo`);
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
            this.getMonsterDetail();
        },
    };
</script>