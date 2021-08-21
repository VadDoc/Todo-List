import React from 'react';
import './App.css';
import Todolist from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const taskOne: Array<TaskType> = [
        {id:1, title: 'HTML & CSS', isDone: true},
        {id:2, title: 'JS', isDone: true},
        {id:3, title: 'React', isDone: false},
    ]

    const taskTwo: Array<TaskType> = [
        {id:1, title: 'Meat', isDone: true},
        {id:2, title: 'Beef', isDone: true},
        {id:3, title: 'Fish', isDone: false},
    ]


    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={taskOne}/>
            <Todolist title={'What to buy'} tasks={taskTwo}/>
        </div>
    );
}

export default App;
