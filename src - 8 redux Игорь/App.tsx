import React, {useReducer} from "react";
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddTaskAC, changeStatusAC, RemoveTaskAC, TaskReducer} from "./reducers/TaskReducer";
import {filterReducer, setFilterAC} from "./reducers/FilterReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    // let [tasks, dispatchTasks] = useReducer(TaskReducer, [
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);

    // let [filter, dispatchFilter] = useReducer(filterReducer, "all");

    let dispatch=useDispatch();
    let tasks=useSelector<rootReducerType,TaskType[]>(state => state.tasks)
    // let filter=useSelector<rootReducerType,FilterValuesType>(state => state.filter)


    function removeTask(id: string) {
        dispatch(RemoveTaskAC(id))
        // dispatchTasks(RemoveTaskAC(id));
    }

    function addTask(title: string) {
        dispatch(AddTaskAC(title));
        // dispatchTasks(AddTaskAC(title));
    }

    function changeStatus(taskId: string, isDone: boolean) {
        dispatch(changeStatusAC(taskId, isDone))
        // dispatchTasks(changeStatusAC(taskId, isDone))
    }


    // let tasksForTodolist = tasks;
    //
    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => !t.isDone);
    // }
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone);
    // }
    //
    // function changeFilter(value: FilterValuesType) {
    //     dispatch(setFilterAC(value))
    //     // dispatchFilter(setFilterAC(value))
    // }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      // tasks={tasksForTodolist}
                      removeTask={removeTask}
                      // changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      // filter={filter}
            />
        </div>
    );
}

export default App;
