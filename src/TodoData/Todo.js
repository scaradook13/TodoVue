import { reactive, toRefs } from "vue";

const todoThings = reactive({
    listOfTask: [],
    IsModalShow: false,
    IsUpdateShow: 0,
    IsDeletingShow: 0,
});

export default function todoFunctions() {
    
      const addTask = async (payload) => {
        const newTask = {...payload}
        todoThings.listOfTask.push(newTask);
        todoThings.IsModalShow = !todoThings.IsModalShow

        payload.id = Math.random()
        payload.name = ""
        payload.isCompleted = false
      }

      const checkedTask = (payload) => {
        const task = todoThings.listOfTask.find(task => task.id === payload);
        if (task) {
          task.isCompleted = !task.isCompleted;
        }
      }

      const deleteTask = async (id) => {
        const data = todoThings.listOfTask.filter((task) => task.id !== id)
        todoThings.listOfTask = data;
        todoThings.IsDeletingShow = ''
      }

      const toggleModal = () => {
        todoThings.IsModalShow = !todoThings.IsModalShow
      }

      const startEditing = (id) => {
        if(todoThings.IsUpdateShow !== id){
          todoThings.IsUpdateShow = id
        }
        else{
          todoThings.IsUpdateShow = ''
        }
      }

      const updatedTodo = (payload, id) => {
        const updateTask = {...payload}

        const task = todoThings.listOfTask.find(task => task.id === id);
            if (task) {
              task.name = updateTask.name;
            }
            todoThings.IsUpdateShow = ''
            payload.name = ''
      }

      const ShowDelete = (payload) => {
        if(todoThings.IsDeletingShow !== payload){
            todoThings.IsDeletingShow = payload
        }
        else{
            todoThings.IsDeletingShow = ''
        }
      }

    return {
      ...toRefs(todoThings),
      addTask,
      checkedTask,
      deleteTask,
      toggleModal,
      startEditing,
      updatedTodo,
      ShowDelete,
    };
  }