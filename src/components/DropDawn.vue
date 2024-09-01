<template>
  <div class="main-div">
    <select v-model="selectedStatus" @change="filterStatus" class="dropDown">
      <option value="" class="option" selected>All</option>
      <option
        v-for="status in status"
        :key="status.value"
        :value="status.value"
      >
        {{ status.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "./Stores/TaskStore";
const taskStore = useTaskStore();
const selectedStatus = ref("");

const status = [
  {
    label: "Completed",
    value: true,
  },
  {
    label: "Uncompleted",
    value: false,
  },
];

function filterStatus() {
  taskStore.setStatusFilter(selectedStatus.value);
}
</script>

<style lang="scss">
.dropDown {
  display: inline-block;
  width: 15%;
  margin: 5px;
  background-color: rgb(250, 250, 250);
  border: 1px solid rgb(223, 223, 223);
  color: black;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
}
</style>
