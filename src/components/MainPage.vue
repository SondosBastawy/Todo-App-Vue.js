<template>
  <div class="main-content">
    <div class="header">
      <div class="header-title">
        <img src="../assets/images/icons8-todo-list-64.png" alt="" />
        <h2>Todo List</h2>
      </div>
      <div class="btn">
        <img src="../assets/images/sun_037.jpg" alt="" />
      </div>
    </div>
    <div class="filterDiv">
      <div className="input-search">
        <img src="../assets/images/icons8-search-30.png" alt="" />
        <input
          type="text"
          placeholder="search your note"
          v-model="searchQuery"
          @input="updateSearchQuery"
        />
      </div>
      <DropDawn />
    </div>
    <AllTasks />
  </div>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import AllTasks from "./AllTasks.vue";
import { useTaskStore } from "./Stores/TaskStore";
import DropDawn from "./DropDawn.vue";

const tasks = computed(() => getTasks.tasks);
const taskStore = useTaskStore();

const searchQuery = ref("");

const updateSearchQuery = () => {
  taskStore.setSearchQuery(searchQuery.value);
};
</script>
<style lang="scss">
.main-content {
  width: 73%;
  height: 100vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0;
  .filterDiv {
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    .main-div {
      width: 50%;
      margin-top: 17px;
      select {
        height: 27px;
        width: 30%;
      }
    }
  }
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .header-title {
    h2 {
      text-align: center;
      padding: 2px;
    }
  }
}
.btn {
  width: 105px;
  margin-right: 15px;
  background-color: white;
  height: 45px;
  margin-top: 7px;
  border-radius: 30px;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.601);
  border: none;

  img {
    width: 30%;
    padding: 1px;
    text-align: center;
    position: relative;
    top: 8px;
    left: 8px;
  }
}
.header-title {
  width: 60%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  h2 {
    color: #316fdb;
  }
  img {
    width: 60px;
  }
}
.input-search {
  background-color: white;
  width: 38%;
  margin: 20px;
  height: 2.05rem;
  border-radius: 15px;
  padding: 0 15px;
  box-shadow: 0px 0px 2px #224597; // box-shadow: inset 0px 0px 8px #bc17bc;
  display: flex;
  align-items: center;
  input {
    background-color: transparent;
    border: none;
    height: 100%;
    font-size: 1.25rem;
    width: 100%;
    margin-left: 9px;
    line-break: normal;
    &:focus {
      outline: none;
    }
  }
}
</style>
