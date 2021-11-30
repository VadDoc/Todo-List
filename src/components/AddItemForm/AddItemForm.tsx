import React, {useCallback, useState} from "react";
import {SingleInput} from "../Commons/SingleInput";
import {Button} from "../Commons/Button";

export type ErrorType = string | null
type PropsType = {
  addItem: (title: string) => void
  buttonName: string
}

export const AddItemForm = React.memo(({addItem, buttonName}: PropsType) => {
  console.log('Add item')
  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<ErrorType>(null)

  const callBackInput = useCallback(() => {
    if (title.trim() !== "") {
      addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  },[title, addItem])

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
})
