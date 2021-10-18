import {
  addTaskAC,
  changeStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TasksReducer
} from "./TasksReducer";
import {TasksType} from "../App";
import {addTodoListAC, removeTodolistAC} from "./TodoListsReducer";

test('Remove task', () => {
  const startState = {
    todolistID1: [
      {id: '1', title: "JS", isDone: true},
      {id: '2', title: "ReactJS", isDone: false},
    ],
    todolistID2: [
      {id: '1', title: "HTML", isDone: true},
      {id: '2', title: "CSS", isDone: false},
    ]
  }
  const endState = TasksReducer(startState, removeTaskAC('todolistID1', '1'))

  expect(endState.todolistID1.length).toBe(1)
  expect(endState.todolistID2.length).toBe(2)
  expect(endState.todolistID1.every(t => t.id !== '1')).toBeTruthy()
})

test('Add task', () => {
  const startState = {
    todolistID1: [
      {id: '1', title: "JS", isDone: true},
      {id: '2', title: "ReactJS", isDone: false},
    ],
    todolistID2: [
      {id: '1', title: "HTML", isDone: true},
      {id: '2', title: "CSS", isDone: false},
    ]
  }

  const newTaskTitle = 'Angular'
  const endState = TasksReducer(startState, addTaskAC('todolistID1', newTaskTitle))

  expect(endState.todolistID1.length).toBe(3)
  expect(endState.todolistID2.length).toBe(2)
  expect(endState.todolistID1[0].title).toBe(newTaskTitle)
  expect(endState.todolistID1[0].id).toBeDefined()
  expect(endState.todolistID1[0].isDone).toBe(false)
})

test('Change task status', () => {
  const startState = {
    todolistID1: [
      {id: '1', title: "JS", isDone: false},
      {id: '2', title: "ReactJS", isDone: false},
    ],
    todolistID2: [
      {id: '1', title: "HTML", isDone: false},
      {id: '2', title: "CSS", isDone: false},
    ]
  }

  const endState = TasksReducer(startState, changeStatusAC('todolistID1', '2', true))

  expect(endState.todolistID1[0].isDone).toBeFalsy()
  expect(endState.todolistID1[1].isDone).toBeTruthy()
  expect(endState.todolistID2[0].isDone).toBeFalsy()
  expect(endState.todolistID2[1].isDone).toBeFalsy()
})

test('Change task title', () => {
  const startState = {
    todolistID1: [
      {id: '1', title: "JS", isDone: false},
      {id: '2', title: "ReactJS", isDone: false},
    ],
    todolistID2: [
      {id: '1', title: "HTML", isDone: false},
      {id: '2', title: "CSS", isDone: false},
    ]
  }

  const endState = TasksReducer(startState, changeTaskTitleAC('todolistID1', '1', 'Angular'))

  expect(endState.todolistID1[0].title).toBe('Angular')
  expect(endState.todolistID1[1].title).toBe('ReactJS')
  expect(endState.todolistID2[0].title).toBe("HTML")
  expect(endState.todolistID2[1].title).toBe("CSS")
})

test('new array should be added when new todolist is added', () => {
  const startState: TasksType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };

  const action = addTodoListAC("new todolist");

  const endState = TasksReducer(startState, action)


  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
  const startState: TasksType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  };

  const action = removeTodolistAC("todolistId2");
  const endState = TasksReducer(startState, action)
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined();
});

