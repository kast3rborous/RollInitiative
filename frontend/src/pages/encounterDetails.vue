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
      <h3>{{encounter[0].encountername}}</h3>
    </b-jumbotron>
    <br />
    <div v-if="loading">Loading page....</div>
    <div v-else>
    <strong>Characters</strong>
<b-table-simple hover small caption-top responsive>
      <b-thead>
        <b-tr>
          <b-th>Name</b-th>
          <b-th>Player</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="character in encounter" :key="character.ac">
          <b-td>{{ character.name }}</b-td>
          <b-td>{{ character.ac }}</b-td>
          <b-td>{{character.initiativebonus}}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
  </div>
</template>

<script>
import Api from "../api";

export default {
  name: "encounterDetails",
  data: function () {
    return {
      loading: false,
      encounter: null,
    };
  },
  created: function () {
    this.loading = true;
    Api.getCampaignEncounterDetails(this.$route.params.id).then((res) => {
      this.encounter = res.data[0];
      this.loading = false;
    });
  },
};
</script>