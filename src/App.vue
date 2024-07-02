<template>
  <div>
    <TodoApp :listOfTask="listOfTask" :show="IsModalShow" @addTask="addTaskHandler"
     @toggleTask="checkedTask" @removeTask="deleteTask" @toggleModal="toggleModalHandler" @startEditing="startEditingHandler"
     @updatedForm="updatedFormHandler" @ShowDelete="ShowDeleteHandler"/>
  </div>
</template>

<script setup>
import { provide, ref, inject} from 'vue';
import TodoApp from './components/TodoApp.vue';
const listOfTask = ref([]);
const IsModalShow = ref(false);
const IsUpdateShow = ref();
const IsDeletingShow = ref()
provide('ModalUpdate', IsUpdateShow)
provide('DeletingTaskShow',IsDeletingShow)

const addTaskHandler = (payload) => {
  listOfTask.value.push(payload)
  console.log(payload);
  IsModalShow.value = !IsModalShow
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
const toggleModalHandler = () => {
  IsModalShow.value = !IsModalShow.value
}
const startEditingHandler = (id) => {
  if(IsUpdateShow.value !== id){
    IsUpdateShow.value = id
  }
  else{
    IsUpdateShow.value = ''
  }
}
const updatedFormHandler = (payload, id) => {
  const task = listOfTask.value.find(task => task.id === id);
      if (task) {
        task.name = payload;
      }
  IsUpdateShow.value = ''
}
const ShowDeleteHandler = (payload) => {
  if(IsDeletingShow.value !== payload){
    IsDeletingShow.value = payload
  }
  else{
    IsDeletingShow.value = ''
  }
}
</script>