import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddTaskAC, ChangeStatusAC, RemoveTaskAC, TaskReducer} from "./Reducers/TaskReducer";
import {FilterAC, FilterReducer} from "./Reducers/FilterReducer";

export type FilterValuesType = "all" | "active" | "completed";
//export type FilterValuesType = string

function App() {

    let [tasks, dispatchTasks] = useReducer(TaskReducer,[
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    let [filter, dispatchFilter] = useReducer(FilterReducer, "all");

    function removeTask(id: string) {
        dispatchTasks(RemoveTaskAC(id))
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(title: string) {
        dispatchTasks(AddTaskAC(title))
        // let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        dispatchTasks(ChangeStatusAC(taskId, isDone))
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
    }

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        dispatchFilter(FilterAC(value))
        // setFilter(value);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
