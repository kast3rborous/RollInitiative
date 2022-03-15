import Vue from "vue";
import VueRouter from "vue-router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import App from "./App.vue";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Article from "./pages/Article";
import userInfo from "./pages/UserInfo";
import createCharacter from "./pages/createCharacter";
import createCampaign from "./components/createCampaign";    //Added by TGG on 3/3
import createMonster from "./pages/createMonster";      //Added by TGG on 3/12
import MyCampaigns from "./components/MyCampaigns";
import addCampaign from "./components/addCampaign";
import AdminArticleAdd from "./components/AdminArticleAdd";
import AdminArticleList from "./components/AdminArticleList";
import AdminArticleEdit from "./components/AdminArticleEdit";
import campaignDetails from "./pages/campaignDetails";
import encounterDetails from "./pages/encounterDetails";
Vue.config.productionTip = false;

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { getJwtToken } from "./auth";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);

const checkAuth = function(to, _, next) {
  const token = getJwtToken();
  if (token === undefined || token === "undefined" || token === null) {
    // redirect to login because we don't have token yet
    next({
      path: "/login",
      params: { nextUrl: to.fullPath },
    });
  } else {
    next();
  }
};

const router = new VueRouter({
  routes: [
    { path: "/", component: Home },
    { path: "/article/:id", component: Article },
    { path: "/login", component: Login },
    { path: "/logout", component: Logout },
    { path: "/register", component: Register },
    { path: "/createCharacter", component: createCharacter },
    { path: "/createMonster", component: createMonster },                //Added by TGG on 3/12
    { path: "/campaignDetails/:id", component: campaignDetails, 
    children:[{path: "/encounter/:id", component: encounterDetails}]},
    { 
      path: "/userinfo",
            component: userInfo,
            beforeEnter: checkAuth,
            children: [
              { path: "addCampaign", component:addCampaign },
              { path: "createCampaign", component: createCampaign },     //Added by TGG on 3/3
              { path: "", component: MyCampaigns },
            ],
    },
    {
      path: "/admin",
      component: Admin,
      beforeEnter: checkAuth,
      children: [
        { path: "add", component: AdminArticleAdd },
        { path: "edit/:id", component: AdminArticleEdit },
        { path: "", component: AdminArticleList },
      ],
    },
  ],
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
