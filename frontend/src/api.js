import axios from "axios";
import { authHeader, getJwtToken, getUserIdFromToken } from "./auth";

const API_URL = "http://54.215.103.213:8000";

class Api {
  getArticles() {
    return axios.get(API_URL + "/articles", {});
  }

  getArticleDetail(id) {
    return axios.get(API_URL + `/articles?articleid=eq.${id}`);
  }

  addArticle(article) {
    return axios.post(
      API_URL + "/articles",
      {
        ...article,
        // add user id from JWT token
        userid: getUserIdFromToken(getJwtToken()),
      },
      {
        headers: authHeader(),
      }
    );
  }

  updateArticle(article) {
    return axios.patch(
      API_URL + `/articles?articleid=eq.${article.articleid}`,
      article,
      {
        headers: authHeader(),
      }
    );
  }

  deleteArticle(id) {
    return axios.delete(API_URL + `/articles?articleid=eq.${id}`, {
      headers: authHeader(),
    });
  }

  publishArticle(id) {
    return axios.post(
      API_URL + "/rpc/publish",
      { id: id },
      {
        headers: authHeader(),
      }
    );
  }

  login(email, password) {
    return axios.post(API_URL + "/rpc/login", { email, password });
  }

  signup(email, password, name) {
    return axios.post(API_URL + "/rpc/signup", { email, password, name });
  }

  createCharacter(ac, hp, initiativeBonus, characterName, level, campaignid){
    return axios.post(API_URL + "/character", 
    {ac: ac, hp: hp, initiativebonus: initiativeBonus, charactername: characterName, level: level, 
      userid:getUserIdFromToken(getJwtToken()), campaignid: campaignid}, {headers: authHeader()});
  }
  async getCampaignid(campaignCode){
    return axios.get(API_URL + `/campaign?select=campaignid&joincode=eq.${campaignCode}`).then(function(response){console.log(response.data[0].campaignid); return response.data[0].campaignid});
  }
}

//Added by The Great Gonzales on 3/3/2022
createCampaign(campaignId, joinCode, campaignName) {
    return axios.post(API_URL + "/createcampaign",
        { campaignId: campaignId, joinCode: joinCode, campaignName: campaignName, userid: getUserIdFromToken(getJwtToken()) },
        { headers: authHeader() })
}

export default new Api();
