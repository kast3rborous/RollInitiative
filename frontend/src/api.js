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
  createCharacter(ac, hp, initiativeBonus, characterName, level, campaignid){
    return axios.post(API_URL + "/character", 
    {ac: ac, hp: hp, initiativebonus: initiativeBonus, charactername: characterName, level: level, 
      userid:getUserIdFromToken(getJwtToken()), campaignid: campaignid}, {headers: authHeader()});
  }
  returnCharacter(characterid) {
    return axios.get(API_URL + `/character?characterid=eq.${characterid}`,
    {
      headers: authHeader()
    });
  }
  updateCharacter(character) {
    return axios.patch(
      API_URL + `/character?characterid=eq.${character.characterid}`,
      character,
      {
        headers: authHeader(),
      }
    );
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

//Added by The Greate Gonzales on 3/19/2022
updateMonster(monster) {
    return axios.patch(
        API_URL + `/monster?monsterid=eq.${monster.monsterid}`,monster,
        {
            headers: authHeader(),
        }
    );
}

//Added by The Greate Gonzales on 3/19/2022
returnMonster(monsterid) {
    return axios.get(API_URL + `/monster?monsterid=eq.${monsterid}`,
        {
            headers: authHeader()
        }
    );
}

//Added by The Greate Gonzales on 3/19/2022
deleteMonster(monsterid) {
  return axios.delete(API_URL + `/monster?monsterid=eq.${monsterid}`, {
    headers: authHeader()
  });
}


getCampaigns(userid) {
  return axios.get(API_URL + `/campaignlist?userid=eq.${userid}`);
}

deleteCampaign(campaignid) {
  return axios.post(API_URL + "/rpc/deletecampaign",
  {
    campaignid: campaignid
  },
    { headers: authHeader() });
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

deleteCharacter(characterid) {
  return axios.delete(API_URL + `/character?characterid=eq.${characterid}`, {
    headers: authHeader()
  });
}


getCampaignEncounters(id){
  return axios.get(API_URL + `/encounter?campaignid=eq.${id}`)
}
getCampaignEncounterDetails(id){
  return axios.get(API_URL + `/encountersummary?encounterid=eq.${id}`)
}
getCampaignbyid(id){
  return axios.get(API_URL + `/campaign?campaignid=eq.${id}`)
}
getMonsters(id){
  return axios.get(API_URL +`/monster?or=(public.eq.True, userid.eq.${id})`)
}
createEncounter(monsters, name, campaignid){
  return axios.post(API_URL +`/rpc/createencounter`,
  {
    _monsterids: monsters,
    _campaignid: campaignid,
    _encountername: name
  }, {headers: authHeader()})
}
}
export default new Api();