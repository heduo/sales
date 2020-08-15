<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer :position="position"></Footer>
  </div>
</template>
<script>
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { EventBus } from "./EventBus";

export default {
  data() {
    return {
      activeRoute: "/",
    };
  },
  mounted() {
    var vm = this; // vue model of App component
    // receive update-route event, then update activeRoute
    EventBus.$on("update-route", function (activeRoute) {
      vm.activeRoute = activeRoute;
    });
  },

  computed: {
    position() {
      if (this.activeRoute === "/") {
        return "absolute";
      } 
      return "relative"; 
    },
  },
};
</script>