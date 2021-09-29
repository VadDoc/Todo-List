import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = {
  id: string, title: string, filter: FilterValuesType
}
type TasksType = {
  [key: string]: Array<TaskType>
}

function App() {

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<todolistsType>>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState<TasksType>({
    [todolistID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS2", isDone: true},
      {id: v1(), title: "ReactJS2", isDone: false},
      {id: v1(), title: "Rest API2", isDone: false},
      {id: v1(), title: "GraphQL2", isDone: false},
    ]
  });

  const addTodoList = (title: string) => {
    setTodolists([...todolists, {id: v1(), title: title, filter: 'all'}])
  }

  const removeTodolist = (todolistID: string) => {
    setTodolists(todolists.filter(f => f.id !== todolistID))
  }

  function removeTask(todolistID: string, id: string) {
    setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
  }

  function addTask(todolistID: string, title: string) {
    setTasks({...tasks, [todolistID]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistID]]})
  }

  function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
    setTasks({...tasks, [todolistID]: tasks[todolistID].map(f => f.id === taskId ? {...f, isDone: isDone} : f)})
  }


  function changeFilter(todolistID: string, value: FilterValuesType) {
    setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))
  }

  return (
    <div className="App">
      {/*<AreaAddTodoList*/}
      {/*  addTodoList={addTodoList}*/}
      {/*/>*/}
      <div className={"todos-wrapper"}>
        {todolists.map(m => {
          let tasksForTodolist = tasks[m.id];

          if (m.filter === "active") {
            tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
          }
          if (m.filter === "completed") {
            tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
          }

          return (
            <Todolist
              key={m.id}
              todolistID={m.id}
              removeTodolist={removeTodolist}
              title={m.title}
              tasks={tasksForTodolist}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeStatus}
              filter={m.filter}
            />
          )
        })}
      </div>

    </div>
  );
}

export default App;
