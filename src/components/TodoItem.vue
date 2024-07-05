<script setup>
import { reactive } from 'vue';
import Modal from './ModalTemplate.vue';
import todoFunctions from "@/TodoData/Todo";
const {listOfTask,IsUpdateShow,IsDeletingShow,checkedTask,deleteTask,startEditing,updatedTodo,ShowDelete} = todoFunctions();

const updateTask = reactive ({
  name: ''
})
</script>
<template>
  <section v-for="item in listOfTask" :key="item.id">
    <div class="flex justify-between p-4 bg-violet-600 mx-4 my-3 rounded">
          <div class="flex items-center w-9/12">
          <input type="checkbox" :checked="item.isCompleted" @change="checkedTask(item.id)">
          <div>
            <p class="pl-5 text-white" @dblclick="startEditing(item.id)">{{ item.name }}</p>
    </div>
      <div>
        <Modal v-if="IsUpdateShow === item.id">
        <template #modal-header>
        <h3 class="text-lg font-bold">Update task: {{ item.name }}</h3>
      </template> 

      <!-- Second Slot -->
      <template #modal-content>
        <input v-model="updateTask.name" type="text" class="border rounded border-black  px-2">
      </template>

      <!-- Last Slot Action -->
      <template #default>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <div class="flex gap-5">
            <button class="bg-red-500 text-white py-1 px-3 rounded font-semibold" @click="startEditing">Cancel</button>
            <button class="bg-green-500 text-white py-1 px-3 rounded font-semibold" @click="updatedTodo(updateTask, item.id)">Update Task</button>
          </div>
          </form>
        </div>
      </template>
      </Modal>
          </div>
      </div>
          <button v-show="item.isCompleted" @click="ShowDelete(item.id)" class="bg-red-500 py-1 px-3 rounded text-white font-semibold">Delete</button>
          <Modal v-if="IsDeletingShow === item.id">
        <template #modal-header>
        <h3 class="text-lg font-bold">Are you sure to delete? {{ item.name }}</h3>
      </template>
      <!-- Last Slot Action -->
      <template #default>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <div class="flex gap-5">
            <button class="bg-gray-500 text-white py-1 px-3 rounded font-semibold" @click="ShowDelete(item.id)">Cancel</button>
            <button class="bg-red-500 text-white py-1 px-3 rounded font-semibold" @click="deleteTask(item.id)">Delete</button>
          </div>
          </form>
        </div>
      </template>
      </Modal>
    </div>
  </section>
</template>