import React, {useState} from 'react';
import './App.css';
import Todolist from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])

    const [filter, setFilter] = useState<string>('all')

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    const changeTodoFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    let tasksForRender = tasks
    if(filter === 'active') {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if(filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasksForRender} removeTask={removeTask} changeTodoFilter={changeTodoFilter}/>
        </div>
    );
}

export default App;
