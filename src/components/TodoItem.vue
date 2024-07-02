<script setup>
import { inject,ref } from 'vue';
import Modal from './ModalTemplate.vue';
const updatedInput = ref('')
const ModalUpdate = inject('ModalUpdate');
const IsDeletingTask = inject('DeletingTaskShow')
const props = defineProps(['id', 'name', 'isCompleted','show'])
const emit = defineEmits(['toggleTask', 'removeTask', 'startEditing', 'updatedForm','ShowDelete'])

const checkedTask = () => {
    emit('toggleTask', props.id)
}
const deleteTask = () => {
    emit('removeTask', props.id)
}
const startEditing = () => {
    emit('startEditing', props.id)
}
const UpdateTask = async () => {
  const updatedForm = {
    name: updatedInput.value
  }
  emit('updatedForm', updatedForm.name, props.id)
}
const deleteTaskshow = () => {
  emit('ShowDelete', props.id)
}
</script>
<template>
    <div class="flex justify-between p-4 bg-violet-600 mx-4 my-3 rounded">
          <div class="flex items-center w-9/12">
          <input type="checkbox" :checked="props.isCompleted" @change="checkedTask(props.id)">
          <div>
            <p class="pl-5 text-white" @dblclick="startEditing(props.id)">{{ props.name }}</p>
          </div>
          <div>
            <Modal v-if="ModalUpdate === props.id">
        <template #modal-header>
        <h3 class="text-lg font-bold">Update task: {{ props.name }}</h3>
      </template> 

      <!-- Second Slot -->
      <template #modal-content>
        <input v-model="updatedInput" type="text" class="border rounded border-black  px-2">
      </template>

      <!-- Last Slot Action -->
      <template #default>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <div class="flex gap-5">
            <button class="bg-red-500 text-white py-1 px-3 rounded font-semibold" @click="startEditing">Cancel</button>
            <button class="bg-green-500 text-white py-1 px-3 rounded font-semibold" @click="UpdateTask(props.id)">Update Task</button>
          </div>
          </form>
        </div>
      </template>
      </Modal>
          </div>
      </div>
          <button v-show="props.isCompleted" @click="deleteTaskshow(props.id)" class="bg-red-500 py-1 px-3 rounded text-white font-semibold">Delete</button>
          <Modal v-if="IsDeletingTask === props.id">
        <template #modal-header>
        <h3 class="text-lg font-bold">Are you sure to delete? {{ props.name }}</h3>
      </template>
      <!-- Last Slot Action -->
      <template #default>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <div class="flex gap-5">
            <button class="bg-gray-500 text-white py-1 px-3 rounded font-semibold" @click="deleteTaskshow(props.id)">Cancel</button>
            <button class="bg-red-500 text-white py-1 px-3 rounded font-semibold" @click="deleteTask(props.id)">Delete</button>
          </div>
          </form>
        </div>
      </template>
      </Modal>
    </div>
</template>