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
      <p>Welcome to the Roll Initiative!</p>
    </b-jumbotron>
    <br />
    <!--
    <div v-if="loading">Loading page....</div>
    <ul v-else>
      <li v-for="article in articles" :key="article.articleid">
        <router-link :to="`article/${article.articleid}`">{{
          article.title
        }}</router-link>
      </li>
    </ul>
    -->
  </div>
</template>

<script>
import Api from "../api";

export default {
  name: "Home",
  data: function () {
    return {
      loading: false,
      articles: [],
    };
  },
  created: function () {
    this.loading = true;
    Api.getArticles().then((res) => {
      this.articles = res.data;
      this.loading = false;
    });
  },
};
</script>