<template>
  <div class="layout roboto-bold">
    <SideNav />
    <MainPage />
  </div>
</template>

<script setup>
import MainPage from "./components/MainPage.vue";
import SideNav from "./components/SideNav.vue";
import "./assets/style.scss";
</script>
<style lang="scss">
.layout {
  display: flex;
  background-color: white;
}
.roboto-bold {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: bold;
}
</style>
