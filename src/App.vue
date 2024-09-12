<template>
  <div class="layout roboto-bold">
    <SideNav />
    <MainPage />
  </div>
</template>

<script setup>
import MainPage from "./components/MainPage.vue";
import SideNav from "./components/SideNav.vue";
// import "./assets/styles/main.scss";
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
@media screen and (max-width: 768px) {
  .layout {
    widows: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
