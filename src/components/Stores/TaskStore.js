import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [],
    categories: [],
    searchQuery: "",
    filteredTasks: [],
    statusFilter: "",
    filteredCategoryId: "",
  }),

  getters: {
    getTasks: (state) => state.tasks,
    getCategories: (state) => state.categories,
    getSearchQuery: (state) => state.searchQuery,
    getFilteredTasks: (state) => {
      let tasks = state.tasks;
      if (state.searchQuery) {
        tasks = tasks.filter((task) => {
          return task.title
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase());
        });
      }
      if (state.filteredCategoryId) {
        tasks = tasks.filter((task) => {
          return task.categoryId == state.filteredCategoryId;
        });
      }
      if (state.statusFilter !== "") {
        tasks = tasks.filter((task) => {
          return task.completed == state.statusFilter;
        });
      }
      return tasks;
    },

    getStatusFilter: (state) => state.statusFilter,
    getStatuses: (state) => state.status,
  },
  actions: {
    setSearchQuery(query) {
      this.searchQuery = query;
    },
    setStatusFilter(status) {
      console.log("selectedStatus.value", status);
      this.statusFilter = status;
    },
    toggleTaskCompletion(id) {
      this.tasks = this.tasks.map((task) => {
        if (task.id == id) {
          task.completed = !task.completed;
        }
        return task;
      });
    },
    addCategory(category) {
      console.log(this.categories);
      this.categories.push(category);
      localStorage.setItem("categories", JSON.stringify(this.categories));
    },
    deleteCategory(id) {
      this.categories = this.categories.filter((item) => item.id != id);
      this.tasks = this.tasks.filter((task) => task.categoryId != id);
      console.log(this.tasks);
      console.log(this.categories);
      localStorage.setItem("categories", JSON.stringify(this.categories));
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    filterTasksByCategory(id) {
      this.filteredCategoryId = id;
      console.log(this.filteredTasks);
    },
  },
});
