import React, {ChangeEvent, KeyboardEvent} from 'react';
import {ErrorType} from "../AddItemForm/AddItemForm";

type PropsType = {
  title: string
  setTitle: (title: string) => void
  callBack: () => void
  error: ErrorType
  setError: (error: ErrorType) => void
}

export const SingleInput = React.memo(({title, setTitle, callBack, error, setError}: PropsType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
   if (error !== null) setError(null)
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
})