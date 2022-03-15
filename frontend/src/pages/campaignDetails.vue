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
      <p>{{campaignDetails[0].campaignname}}</p>
    </b-jumbotron>
    <br />
    <div v-if="loading">Loading page....</div>
    <div v-else>
<b-table-simple hover small caption-top responsive>
      <b-thead>
        <b-tr>
          <b-th>Name</b-th>
          <b-th>Player</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="character in campaignDetails" :key="character.characterid">
          <b-td>{{ character.charactername }}</b-td>
          <b-td>{{ character.username }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-table-simple hover small caption-top responsive>
      <b-thead>
        <b-tr>
          <b-th>Name</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="encounter in encounterDetails" :key="encounter.encountername">
          <b-td>{{ encounter.encountername }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
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
      encounterDetails: []
    };
  },
  created: function () {
    this.loading = true;
    Api.getCampaignCharacters(this.$route.params.id).then((res) => {
      this.campaignDetails = res.data;
    });
    Api.getCampaignEncounters(this.$route.params.id).then((res) =>{
      this.encounterdetails = res.data;
      this.loading = false
    });
  },
};
</script>