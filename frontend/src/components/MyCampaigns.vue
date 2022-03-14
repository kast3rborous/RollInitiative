<template>
  <div>
    <router-link to="userinfo/addCampaign" tag="b-button" class="float-right"
      >Join Campaign</router-link
    >
    <router-link to="userinfo/createCampaign" tag="b-button" class="float-right"
      >Create Campaign</router-link
    >
    <br /><br />
    <b-table-simple hover small caption-top responsive>
      <b-thead>
        <b-tr>
          <b-th>ID</b-th>
          <b-th>Name</b-th>
          <b-th>Actions</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="campaign in campaign" :key="campaign.campaignid">
          <b-td>{{ campaign.campaignid }}</b-td>
          <b-td>{{ campaign.campaignname }}</b-td>
          <b-td>
            <b-button-group>
              <b-button
                variant="outline-primary"
                :to="`/campaignDetails/${campaign.campaignid}`"
                >Details</b-button
              >
            </b-button-group>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
import Api from "../api";
import { getUserIdFromToken, getJwtToken } from '../auth';
let userid = getUserIdFromToken(getJwtToken());
export default {
  name: "CampaignList",
  data: function () {
    return {
      loading: false,
      campaign: [],
    };
  },
  created: function () {
    this.getCampaigns(userid);
  },

  methods: {
    getCampaigns(userid) {
      this.loading = true;
      this.campaign = [];
      Api.getCampaigns(userid).then((res) => {
        this.campaign = res.data;
        this.loading = false;
      });
    },
  },
};
</script>