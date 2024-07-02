<script setup>
import TodoItemVue from "./TodoItem.vue";
const props = defineProps(['listOfTask','show'])
const emit = defineEmits(['toggleTask', 'removeTask', 'startEditing','updatedForm', 'ShowDelete'])

const toggleCheckbox = (payload) => {
    emit('toggleTask', payload)
}
const deleteTask = (payload) => {
    emit('removeTask', payload)
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
    <div>
        <TodoItemVue @removeTask="deleteTask" @toggleTask="toggleCheckbox" @startEditing="startEditing" 
         @updatedForm="updatedForm" @ShowDelete="ShowDelete" v-for="item in props.listOfTask" :key="item.listOfTask" :id="item.id"
         :name="item.name" :isCompleted="item.isCompleted"/>
    </div>
</template>