<script setup>
import { ref } from "vue"
import TodoList from './TodoList.vue';
import Modal from './ModalTemplate.vue'
const todoTask = defineProps(['listOfTask', 'show'])
const emit = defineEmits(['addTask', 'toggleTask', 'removeTask', 'toggleModal','updatedForm', 'ShowDelete'])
const taskInput = ref('')
const addTask = async () => {
    const todoForm = {
        id: Math.random(),
        name: taskInput.value,
        isCompleted: false,
    }
    emit('addTask', todoForm)
    taskInput.value = ''
}
const toggleTaskHandler = (payload) => {
  emit('toggleTask', payload);
}
const removeTaskHandler = (payload) => {
  emit('removeTask', payload);
}
const toggleModal = () => {
  emit('toggleModal')
}
const startEditing = (payload) => {
  emit('startEditing',payload)
}
const updatedForm = (payload, id) => {
  emit('updatedForm',payload, id)
}
const ShowDelete = (payload) => {
    emit('ShowDelete', payload);
}
</script>

<template>
    <div class="m-auto w-96 pt-5">
      <header class="bg-violet-600 p-5 text-center">
        <h1 class="font-semibold text-lg text-white">TODO VUE</h1>
      </header>
      <div v-if="listOfTask.length > 0" class="bg-violet-400 pb-3" >
        <h3 class="pt-3 px-4 font-semibold text-white">Your Task:</h3>
    <ul>
        <TodoList :listOfTask="listOfTask" @toggleTask="toggleTaskHandler" @removeTask="removeTaskHandler"
         @startEditing="startEditing" @updatedForm="updatedForm" @ShowDelete="ShowDelete"></TodoList>
    </ul>  
      </div>
      <div v-else>
        <p class="text-center bg-violet-400 text-white p-4"> List of Task is Empty</p>
      </div>
      <div class="bg-violet-600">
        <p class="pt-3 px-5 font-semibold text-white">Number of Task: {{ listOfTask.length }} </p>
        <div class="flex justify-center px-5 py-4 pb-5">
        <button class="bg-green-500 text-white py-1 px-3 rounded font-semibold" @click="toggleModal">Add Task</button>
        </div>
      </div>
      <Modal v-if="show">
        <template #modal-header>
        <h3 class="text-lg font-bold">Add New Task</h3>
      </template> 

      <!-- Second Slot -->
      <template #modal-content>
        <input v-model="taskInput" type="text" class="border rounded border-black  px-2">
      </template>

      <!-- Last Slot Action -->
      <template #default>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <div class="flex gap-5">
            <button class="bg-red-500 text-white py-1 px-3 rounded font-semibold" @click="toggleModal">Cancel</button>
            <button class="bg-green-500 text-white py-1 px-3 rounded font-semibold" @click="addTask">Add Task</button>
          </div>
          </form>
        </div>
      </template>
      </Modal>
    </div>
</template>