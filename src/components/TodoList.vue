<script setup>
import TodoItemVue from "./TodoItem.vue";
const props = defineProps(['listOfTask'])
const emit = defineEmits(['toggleTask', 'removeTask'])

const toggleCheckbox = (payload) => {
    emit('toggleTask', payload)
}
const deleteTask = (payload) => {
    emit('removeTask', payload)
}
</script>
<template>
    <div>
        <TodoItemVue @removeTask="deleteTask" @toggleTask="toggleCheckbox" v-for="item in props.listOfTask" :key="item.listOfTask" :id="item.id"
         :name="item.name" :isCompleted="item.isCompleted"/>
    </div>
</template>