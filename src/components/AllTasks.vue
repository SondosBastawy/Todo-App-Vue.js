<template>
  <div class="displayData">
    <div>
      <h2 class="title">Your Tasks</h2>
    </div>
    <div class="task-list">
      <div
        class="task"
        v-for="(task, index) in filteredTasks"
        :key="index"
        :class="{ completed: task.completed }"
      >
        <div class="task-title">
          <input
            type="checkbox"
            v-model="task.completed"
            @change="toggleCompletion(task)"
          />
          {{ task.title }}
        </div>
        <div class="buttons">
          <button @click="deleteTask(index)" class="buttonDelete">
            <span class="deleteSpan">Delete your task </span>
            <img src="../assets/images/icons8-delete-64.png" alt="" />
          </button>
          <button @click="showUpdateModel(task, index)" class="buttonUpdate">
            <span class="updateSpan">Update your task </span>
            <img src="../assets/images/icons8-edit-30.png" alt="" />
          </button>
        </div>
        <h5>Associated to {{ task.categoryName }}</h5>
      </div>
    </div>
    <div class="show-popup" @click="openCreateModal()">
      <button>
        <h4>Add your task</h4>
        <img src="../assets/images/icons8-add-64.png" alt="" />
      </button>
    </div>
    <div class="popup-section" v-if="showPopup">
      <div class="popup">
        <h3>Add your task</h3>
        <div class="popup-body">
          <form @submit.prevent="save">
            <div class="selectedCategoryDiv">
              <label for="">Select your category </label>
              <select
                name="select your category"
                @change="selectCategory"
                v-model="selectedCategory"
                class="select"
              >
                <option
                  v-for="category in taskStore.categories"
                  :key="category.id"
                  :value="category"
                >
                  {{ category.title }}
                </option>
              </select>
            </div>
            <div class="adding-task">
              <label for="input" title="Add your task ">Add your task</label>
              <input
                type="text"
                placeholder="add your task"
                v-model="task_input"
              />
            </div>
          </form>
          <div class="popup-buttons">
            <button @click="save" class="save" v-if="isCreated && !isUpdated">
              save your task
            </button>
            <button
              @click="update()"
              class="update"
              v-if="isUpdated && !isCreated"
            >
              update your task
            </button>
            <button @click="cancel" class="cancel">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import { useTaskStore } from "./Stores/TaskStore";
import Categories from "./Categories.vue";

const selectedCategory = ref({});
const taskStore = useTaskStore();
const task_input = ref("");
const showPopup = ref(false);
const isUpdated = ref(false);
const isCreated = ref(false);
const updateIndex = ref(0);
const tasks = computed(() => taskStore.getTasks);

const showUpdateModel = (task, index) => {
  updateIndex.value = index;
  const updatedTask = taskStore.tasks[index];
  if (updatedTask) {
    showPopup.value = true;
    task_input.value = updatedTask.title;
    selectedCategory.value = updatedTask.categoryName;
    isUpdated.value = ref(true);
  }
};

// function handleStatus(filterStatus) {
//   if (filterValues.value.status == filterStatus) {
//     filterValues.value = tasks?.value?.filter(
//       (task) =>
//         statusValues == "all" ||
//         (task.completed == true && statusValues == "completed") ||
//         (task.completed == false && statusValues == "uncompleted")
//     );
//   }
// }

const filteredTasks = computed(() => taskStore.getFilteredTasks);
const statusFilter = computed(() => taskStore.getStatusFilter);

//  Delete task function
const deleteTask = (index) => {
  tasks.value.splice(index, 1);
  // save data in local storage
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
  window.alert("Are you sure you want to delete this task?");
};
// toggle completed
const toggleCompletion = (task) => {
  taskStore.toggleTaskCompletion(task.id);
  if (task) {
    task.completed = !task.completed;
  }
  // save tasks with this state in local storage
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const save = () => {
  if (task_input.value !== "") {
    const task = {
      title: task_input.value,
      completed: false,
      id: tasks.value.length + 1,
      categoryName: selectedCategory?.value?.title,
      categoryId: selectedCategory?.value?.id,
    };
    tasks.value.push(task);
    isCreated.value = false;
    task_input.value = "";
    isUpdated.value = false;
    // save data in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
    showPopup.value = false;
  }
};

function openCreateModal() {
  showPopup.value = true;
  isCreated.value = true;
  isUpdated.value = false;
}

const cancel = () => {
  task_input.value = "";
  showPopup.value = false;
  isCreated.value = false;
  isUpdated.value = false;
};
function update() {
  const selectedId = taskStore.tasks[updateIndex.value].id;
  const task = {
    title: task_input.value,
    completed: false,
    id: selectedId,
    categoryName: selectedCategory?.value?.title,
    categoryId: selectedCategory?.value?.id,
  };
  // console.log(id);
  taskStore.tasks[updateIndex.value] = task;
  console.log(taskStore.tasks);

  task_input.value = "";
  showPopup.value = false;
  // isUpdated.value = false; // Uncomment if needed
  isCreated.value = false;
  // isCreated.value = false;
  // Save data in local storage
  localStorage.setItem("tasks", JSON.stringify(taskStore.tasks));
}
// watch(() => props.filterValues, filterStatus);
</script>

<style lang="scss">
.title {
  color: #316fdb;
}
.show-popup {
  width: 120px;
  position: absolute;
  top: 120%;
  right: 20%;
  text-align: center;
  h4 {
    margin: 0;
    color: #316fdb;
  }
  button {
    border: none;
    margin: 0;
    cursor: pointer;
    border-radius: 50%;
    background-color: transparent;
    img {
      width: 40%;
    }
  }
}
.displayData {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  margin-left: 20px;
}
.popup-section {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 1;
  background-color: rgba(17, 18, 17, 0.756);
  display: flex;
  justify-content: center;
  align-items: center;
  .popup {
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
      flex-direction: column;
      // align-items: center;
      // justify-content: center;
      .select {
        width: 20%;
      }
      form {
        width: 100%;
        padding-left: 30px;
        .selectedCategoryDiv {
          width: 100%;
          display: flex;
          label {
            margin-right: 4px;
          }
        }
        .adding-task {
          background-color: white;
          width: 100%;
          margin-block: 15px;
          border-radius: 17px;
          height: 2.05rem;
          padding: 4px 0px;
          display: flex;
          align-items: center;
          cursor: pointer;
          input {
            background-color: transparent;
            height: 90%;
            border-radius: 5px;
            border: 1px solid #888888;
            font-size: 1.25rem;
            width: 50%;
            margin-left: 9px;
            &:focus {
              outline: none;
            }
          }
        }
      }
      .popup-buttons {
        display: flex;
        margin-inline: 30px;
        width: 40%;
        .save {
          background-color: rgb(59, 171, 61);
          width: 50%;
        }
        .update {
          background-color: #673ab7;
          width: 50%;
        }
        .cancel {
          background-color: rgb(217, 37, 37);
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
            width: 25px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .displayData {
    width: 100%;
    font-size: 20px;
  }
}
.completed {
  text-decoration: line-through;
  color: gray;
}

.task {
  border-bottom: 2px solid #27468e;
  cursor: pointer;
  width: 70%;
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  h4 {
    text-align: center;
    font-size: 26px;
  }
  &:hover .buttons button {
    display: inline;
  }
  .buttons {
    .buttonUpdate {
      position: relative;
      padding: 0px 4px;
      .updateSpan {
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
      &:hover .updateSpan {
        visibility: visible;
        opacity: 1;
      }
    }
    .buttonDelete {
      position: relative;
      padding: 0px 3px;
      .deleteSpan {
        width: 120px;
        text-align: center;
        padding: 5px 0;
        position: absolute;
        top: 45%;
        left: 0;
        visibility: hidden;
        z-index: 1;
        opacity: 0;
        background-color: #d01e1e;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        transition: opacity 0.3s;
      }
      &:hover .deleteSpan {
        visibility: visible;
        opacity: 1;
      }
    }
    button {
      border: none;
      cursor: pointer;
      background-color: transparent;
      display: none;
    }
    img {
      width: 30px;
    }
  }
}
input {
  width: 20px;
  height: 15px;
  cursor: pointer;
  padding-bottom: 5px;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  .popup-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
