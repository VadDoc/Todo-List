import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

type InputPropsType = {
  todolistID: string
  callBack: (todolistID:string, title:string) => void
}

export const Input = ({callBack, todolistID}:InputPropsType) => {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const addTask = () => {
    if (title.trim() !== "") {
      callBack(todolistID, title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  }

  return (
    <div>
      <input value={title}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
             className={error ? "error" : ""}
      />
      <Button callBack={addTask}/>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}