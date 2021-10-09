import React, {useState} from "react";
import {SingleInput} from "./components/SingleInput";
import {Button} from "./components/Button";
import {ErrorType} from "./Todolist";

type AddItemFormPropsType = {
  addItem: (title: string) => void
  buttonName: string
}

export const AddItemForm = ({addItem, buttonName}: AddItemFormPropsType) => {
  let [title, setTitle] = useState<string>("")
  let [error, setError] = useState<ErrorType>(null)

  const callBackInput = () => {
    if (title.trim() !== "") {
      addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  }

  return (
    <div>
      <SingleInput
        callBack={callBackInput}
        title={title}
        setTitle={setTitle}
        error={error}
        setError={setError}
      />
      <Button callBack={callBackInput}>{buttonName}</Button>
    </div>

  )
}
