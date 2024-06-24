<script setup>
const props = defineProps(['id', 'name', 'isCompleted'])
const emit = defineEmits(['toggleTask', 'removeTask'])

const checkedTask = () => {
    emit('toggleTask', props.id)
}
const deleteTask = () => {
    emit('removeTask', props.id)
}
</script>
<template>
    <div class="flex justify-between p-4 bg-violet-600 mx-4 my-3 rounded">
          <div class="flex items-center w-9/12">
          <input type="checkbox" :checked="props.isCompleted" @change="checkedTask(props.id)">
          <p class="pl-5 text-white">{{ props.name }}</p>
          </div>
          <button v-show="props.isCompleted" @:click="deleteTask(props.id)" class="bg-red-500 py-1 px-3 rounded text-white font-semibold">Delete</button>
    </div>
</template>