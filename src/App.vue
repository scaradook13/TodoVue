<template>
  <div>
    <TodoApp :listOfTask="listOfTask" @addTask="addTaskHandler" @toggleTask="checkedTask" @removeTask="deleteTask"/>
  </div>
</template>

<script setup>
import { computed, ref} from 'vue';
import TodoApp from './components/TodoApp.vue';
const listOfTask = ref([]);

const addTaskHandler = (payload) => {
  listOfTask.value.push(payload)
  console.log(payload);
}
const checkedTask = (payload) => {
  const task = listOfTask.value.find(task => task.id === payload);
  if (task) {
    task.isCompleted = !task.isCompleted;
  }
  console.log(task);
}
const deleteTask = async (id) => {
  const data = listOfTask.value.filter((task) => task.id !== id)
  console.log(data);
  listOfTask.value = data;
}
</script>