<template>
  <div class="nav-side">
    <div class="nav-header">
      <h2>Categories list</h2>
      <button type="submit" @click="showCategoryModel()" class="add">
        <img src="../assets/images/icons8-add-64.png" alt="" />
        <span class="tooltiptext">Add category</span>
      </button>
    </div>
    <div class="categories">
      <div class="category" @click="filterTasksByCategory('')">
        <h4>All</h4>
      </div>
      <div
        class="category"
        v-for="(category, id) in categories"
        :key="id"
        @click="filterTasksByCategory(category.id)"
      >
        <h4>{{ category.title }}</h4>
        <button @click.stop="openDeleteModal(category.id)">
          <img src="../assets/images/icons8-delete-64.png" alt="" />
        </button>
      </div>
      <div class="popup-addCategory" v-if="categoryPopup">
        <div class="popup-category">
          <div class="popup-body">
            <form @submit.prevent="addCategory">
              <div class="adding-category">
                <label> Add another category</label>
                <input type="text" v-model="category_input" />
              </div>
            </form>
            <div class="popup-buttons">
              <button @click="addCategory" class="save">Add</button>
              <button @click="cancel" class="cancel">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <div class="deleteCategoryPopup" v-if="deletePopup">
        <div class="popup-category">
          <div class="popup-body">
            <div class="deleting-category">
              <p>Are you sure that you want to delete this category ?</p>
              <h5>
                note: All tasks related to this category will be deleted also.
              </h5>
            </div>
            <div class="popup-buttons">
              <button @click="deleteCategory(deletedCategoryId)" class="delete">
                Delete
              </button>
              <button @click="cancel" class="cancel">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import { useTaskStore } from "./Stores/TaskStore";
import AllTasks from "./AllTasks.vue";

const task = ref({});

const taskStore = useTaskStore();

const category_input = ref("");
const categoryPopup = ref(false);
const deletePopup = ref(false);

const filteredTasks = computed(() => taskStore.getFilteredTasks);
const categories = computed(() => {
  return taskStore.getCategories;
});

(function getCategoriesFromLocalStorage() {
  console.log(localStorage.getItem("categories"));
  if (localStorage.getItem("categories")) {
    const previousCategory = JSON.parse(localStorage.getItem("categories"));
    taskStore.categories = previousCategory;
  }
})();

const addCategory = () => {
  if (category_input.value !== "") {
    const category = {
      title: category_input.value,
      id: categories.value[categories.value.length - 1]?.id + 1 || 1,
    };
    taskStore.addCategory(category);
    category_input.value = "";
    categoryPopup.value = false;
  }
  // save data in local storage
};
const deletedCategoryId = ref(null);

function openDeleteModal(id) {
  deletedCategoryId.value = id;
  deletePopup.value = true;
}
const cancel = () => {
  deletePopup.value = false;
  categoryPopup.value = false;
};

function deleteCategory(id) {
  taskStore.deleteCategory(id);
  deletePopup.value = false;
}
function filterTasksByCategory(id, filteredTasks) {
  taskStore.filterTasksByCategory(id);
}

function showCategoryModel() {
  categoryPopup.value = true;
}
</script>
<style lang="scss">
.nav-side {
  width: 27%;
  height: 100vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.004);
  background-color: rgb(253, 250, 250);
  .nav-header {
    text-align: center;
    display: flex;
    justify-content: center;
    .add {
      // width: 70px;
      border: none;
      background-color: transparent;
      margin-top: 10px;
      cursor: pointer;
      position: relative;
      img {
        width: 2.7em;
      }
    }
    h2 {
      text-align: center;
      padding-top: 10px;
      color: $headers-title;
    }
    span {
      width: 120px;
      text-align: center;
      padding: 5px 0;
      position: absolute;
      top: 45%;
      left: 0;
      visibility: hidden;
      z-index: 1;
      opacity: 0;
      background-color: #8b8a8a;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      transition: opacity 0.3s;
    }
    &:hover span {
      visibility: visible;
      opacity: 1;
    }
  }
}
.roboto-bold {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: bold;
}
.side-nav-content h2 {
  text-align: center;
}
.categories {
  display: flex;
  flex-direction: column;
  margin-top: 35px;
}

.popup-addCategory {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 1;
  background-color: rgba(17, 18, 17, 0.756);
  display: flex;
  justify-content: center;
  align-items: center;
  .popup-category {
    padding: 20px;
    border-radius: 5px;
    background-color: white;
    width: 50%;
    h3 {
      text-align: center;
      font-size: 26px;
      color: $headers-title;
    }
    .popup-body {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .select {
        width: 20%;
      }
      form {
        width: 100%;
        .adding-category {
          background-color: white;
          width: 80%;
          margin: 25px;
          border-radius: 17px;
          height: 2.05rem;
          padding: 3px 10px;
          display: flex;
          align-items: center;
          cursor: pointer;
          label {
            width: 40%;
          }
          input {
            background-color: transparent;
            height: 100%;
            border: 1px solid #888888;
            font-size: 1.25rem;
            border-radius: 5px;
            padding: 1px;
            width: 100%;
            margin-left: 9px;
            &:focus {
              outline: none;
            }
          }
        }
      }
      .popup-buttons {
        display: flex;
        margin: 3px;
        width: 40%;
        .save {
          background-color: rgb(59, 171, 61);
          width: 65%;
        }
        .cancel {
          background-color: rgb(217, 37, 37);
        }
        button {
          cursor: pointer;
          border-radius: 9px;
          margin: 7px;
          font-size: 16px;
          background-color: transparent;
          width: 100px;
          padding: 7px;
          color: white;
          border: none;
          img {
            width: 20px;
          }
        }
      }
    }
  }
}
.deleteCategoryPopup {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 1;
  background-color: rgba(17, 18, 17, 0.756);
  display: flex;
  justify-content: center;
  align-items: center;
  .popup-category {
    padding: 20px;
    border-radius: 5px;
    background-color: white;
    width: 50%;
    h3 {
      text-align: center;
      font-size: 26px;
    }
    .popup-body {
      display: flex;
      align-items: center;
      justify-content: center;
      .select {
        width: 20%;
      }
      .adding-category {
        background-color: white;
        width: 65%;
        margin: 25px;
        border-radius: 17px;
        height: 2.05rem;
        padding: 3px 15px;
        display: flex;
        align-items: center;
        cursor: pointer;
        input {
          background-color: transparent;
          height: 100%;
          border: 1px solid #888888;
          font-size: 1.25rem;
          width: 100%;
          margin-left: 9px;
          &:focus {
            outline: none;
          }
        }
      }
      .popup-buttons {
        display: flex;
        margin: 3px;
        width: 40%;
        .delete {
          background-color: rgb(228, 16, 40);
          width: 65%;
        }
        .cancel {
          background-color: rgb(37, 190, 217);
        }
        button {
          cursor: pointer;
          border-radius: 6%;
          margin: 7px;
          background-color: transparent;
          width: 100px;
          padding: 7px;
          color: white;
          border: none;
          img {
            width: 20px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .nav-side {
    height: 40%;
    width: 100%;
  }
  .categories {
    display: flex;
    flex-direction: row;
  }
  .deleteCategoryPopup {
    width: 100%;
  }
  .popup-addCategory {
    width: 100%;
  }
}
.category {
  box-shadow: 0px 0px 2px #224597;
  border-radius: 8px;
  cursor: pointer;
  width: 85%;
  margin: 12px;
  display: flex;
  justify-content: space-between;
  &:hover button {
    display: inline;
  }
  h4 {
    margin-left: 8px;
    font-size: 16px;
  }
  button {
    border: none;
    display: none;
    cursor: pointer;
    background-color: transparent;
    img {
      width: 25px;
    }
  }
}
</style>
