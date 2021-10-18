import React, {ChangeEvent, KeyboardEvent} from 'react';
import {ErrorType} from "../Todolist";

type InputPropsType = {
  title: string
  setTitle: (title: string) => void
  callBack: () => void
  error: ErrorType
  setError: (error: ErrorType) => void
}

export const SingleInput = ({title, setTitle, callBack, error, setError}:InputPropsType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      callBack();
    }
  }

  return (
    <div>
      <input type="text"
             value={title}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
             className={error ? "error" : ""}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}