import React, {useState} from "react";
import {ErrorType} from "../Todolist";

type PropsType = {
  addItem: (title: string) => void
}

export const AddItem = (props: PropsType) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<ErrorType>(null);

  const addItem = (title: string) => {
    if (title.trim() !== '') {
      props.addItem(title)
      setTitle('')
      setError(null)

    } else {
      setError('Is Error')
    }
  }

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onChangeKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) props.addItem(e.currentTarget.value)
  }
  return (
    <div>
      <input
        value={title}
        onChange={onChangeInputHandler}
        onKeyPress={onChangeKeyPressHandler}
      />
      <button onClick={() => addItem(title)}>+</button>
      {error && <div>{error}</div>}
    </div>
  )
}
