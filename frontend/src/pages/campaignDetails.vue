<template>
  <div>
    <b-navbar>
      <b-navbar-brand :to="{ path: '/' }">Roll Initiative</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{ path: '/login' }">Login</b-nav-item>
          <b-nav-item :to="{ path: '/register' }">Register</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-jumbotron>
      <h3>{{campaignDetails[0].campaignname}}</h3>
    </b-jumbotron>
    <br />
    <div v-if="loading">Loading page....</div>
    <div v-else>
    <strong>Characters</strong>
    <router-link :to="`/createCharacter/${this.$route.params.id}`" tag="b-button" class="float-right"
      >Add Character</router-link
    >
<b-table-simple hover small caption-top responsive>
      <b-thead>
        <b-tr>
          <b-th>Name</b-th>
          <b-th>Player</b-th>
          <b-th>Actions</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="character in campaignCharacters" :key="character.characterid">
          <b-td>{{ character.charactername }}</b-td>
          <b-td>{{ character.username }}</b-td>
          <b-td>
            <b-button-group>
              <b-button
                variant="outline-primary"
                :to="`/editcharacter/${character.characterid}`"
                >Edit</b-button
              >
              <b-button
                variant="outline-danger"
                @click="() => deleteCharacter(character.characterid)"
                >Delete</b-button
              >
            </b-button-group>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <br/>
    <strong>Encounters</strong>
    <b-table-simple hover small caption-top responsive>
      <b-thead>
        <b-tr>
          <b-th>Name</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="encounter in encounterDetails" :key="encounter.encounterid">
          <router-link :to="`/encounterDetails/${encounter.encounterid}`"><b-td>{{ encounter.encountername }}</b-td></router-link>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
  </div>
</template>

<script>
import Api from "../api";

export default {
  name: "campaignDetails",
  data: function () {
    return {
      loading: false,
      campaignDetails: [],
      encounterDetails: [],
      campaignCharacters: []
    };
  },
  created: function () {
    this.loading = true;
    Api.getCampaignCharacters(this.$route.params.id).then((res) => {
      this.campaignCharacters = res.data;
    });
    Api.getCampaignEncounters(this.$route.params.id).then((res) =>{
      this.encounterDetails = res.data;
      this.loading = false
    });
    Api.getCampaignbyid(this.$route.params.id).then((res)=>{
      this.campaignDetails = res.data
    });
  },
  methods: {
    deleteCharacter(characterid) {
      Api.deleteCharacter(characterid)
        .then(() => {
          this.$router.push(`campaignDetails/${this.$route.params.id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>