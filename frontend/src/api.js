import axios from "axios";
import { authHeader, getJwtToken, getUserIdFromToken } from "./auth";

const API_URL = "http://54.215.103.213:8000";

class Api {
  /*
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
  */
  login(email, password) {
    return axios.post(API_URL + "/rpc/login", { email, password });
  }

  signup(email, password, name) {
    return axios.post(API_URL + "/rpc/signup", { email, password, name });
  }
  // Justin Complete - 30/10/22
  createCharacter(ac, hp, initiativeBonus, characterName, level){
    return axios.post(API_URL + "/character", 
    {ac: ac, hp: hp, initiativebonus: initiativeBonus, charactername: characterName, level: level, 
      userid:getUserIdFromToken(getJwtToken()), campaignid: this.$route.query.campaignid}, {headers: authHeader()});
  }
  checkpasswordstrength(password) {
    return axios.post(API_URL + "/rpc/checkpasswordstrength", { password });
  }


//Added by The Great Gonzales on 3/3/2022
createCampaign(campaignId, joinCode, campaignName) {
    return axios.post(API_URL + "/campaign",
        { joincode: joinCode, campaignname: campaignName, dmuserid: getUserIdFromToken(getJwtToken()) },
        { headers: authHeader() })
}

//Added by The Great Gonzales on 3/12/2022
createMonster(ac, cr, initiativeBonus, monsterName, publicBool) {
    return axios.post(API_URL + "/monster",
        {
            ac: ac, cr: cr, initiativebonus: initiativeBonus, monstername: monsterName, public: publicBool,
            userid: getUserIdFromToken(getJwtToken()),
        }, { headers: authHeader() });
}

getCampaigns(userid) {
  return axios.get(API_URL + `/HomeScreen?userid=eq.${userid}`);
}

joinCampaign(code, currentid) {
  return axios.post(API_URL + "/rpc/joincampaign",
  {
    code: code, currentid: currentid 
  },
    { headers: authHeader() });
}

getCampaignCharacters(id){
  return axios.get(API_URL + `/HomeScreen?campaignid=eq.${id}`)
}
getCampaignEncounters(id){
  return axios.get(API_URL + `/encounter?campaignid=eq.${id}`)
}
}
export default new Api();
