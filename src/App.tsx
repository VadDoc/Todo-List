import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
  id: string, title: string, filter: FilterValuesType
}

function App() {
  const tasksId1 = v1()
  const tasksId2 = v1()


  let [allTasks, setAllTasks] = useState({
      [tasksId1]: [
          {id: v1(), title: "HTML&CSS", isDone: true},
          {id: v1(), title: "JS", isDone: true},
          {id: v1(), title: "ReactJS", isDone: false},
          {id: v1(), title: "Rest API", isDone: false},
          {id: v1(), title: "GraphQL", isDone: false},
      ],
      [tasksId2]: [
          {id: v1(), title: "Milk", isDone: true},
          {id: v1(), title: "Book", isDone: true},
          {id: v1(), title: "Coffee", isDone: false},
          {id: v1(), title: "Tea", isDone: false},
          {id: v1(), title: "Bread", isDone: false},
      ]
  })

  const [todoLists, setTodolists] = useState<Array<TodoListType>>([
    {id: tasksId1, title: "What to learn", filter: "active"},
    {id: tasksId2, title: "What to buy", filter: "completed"}
  ])


  function removeTask(id: string, tasksId: string) {
    let tasks = allTasks[tasksId]
    let filteredTasks = tasks.filter(t => t.id !== id);
    allTasks[tasksId] = filteredTasks
    setAllTasks({...allTasks});
  }

  function addTask(title: string, tasksId: string) {
    let task = {id: v1(), title: title, isDone: false};
    let tasks = allTasks[tasksId]
    let newTasks = [...tasks, task]
    allTasks[tasksId] = newTasks
    setAllTasks({...allTasks});

  }

  function changeStatus(taskId: string, isDone: boolean, tasksId: string) {
    let tasks = allTasks[tasksId]
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setAllTasks({...allTasks});
    }
  }


  function changeFilter(value: FilterValuesType, todoListId: string) {

    let todoList = todoLists.find(tl=>tl.id===todoListId)
    if(todoList) {
      todoList.filter = value
      setTodolists([...todoLists])
    }
  }

  function removeTasks(tasksId: string) {
    let filteredTasks = todoLists.filter(tl => tl.id !== tasksId)
    setTodolists(filteredTasks)
    delete allTasks[tasksId]
    setAllTasks({...allTasks})
  }


  return (
    <div className="App">
      {todoLists.map(tl => {
        let tasksForTodolist = allTasks[tl.id];

        if (tl.filter === "active") {
          tasksForTodolist = allTasks[tl.id].filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
          tasksForTodolist = allTasks[tl.id].filter(t => t.isDone);
        }

        return (
          <Todolist
            key={tl.id}
            tasksId={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeTasks={removeTasks}
          />
        )
      })}
    </div>
  );
}

export default App;
