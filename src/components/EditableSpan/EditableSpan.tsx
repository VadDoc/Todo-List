import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
  title: string
  callBack: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log('EditableSpan')
  const [editMode, setEditMode] = useState(false)
  const [value, setValue] = useState('')

  const activateEditMode = () => {
    setEditMode(true)
    setValue(props.title)
  }
  const deActivateEditMode = () => setEditMode(false)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      if (value) {
        props.callBack(value);
        deActivateEditMode()
      }
    }
  }

  return (
    editMode ?
      <input
        type="text"
        value={value}
        onChange={onChange}
        onDoubleClick={deActivateEditMode}
        onBlur={deActivateEditMode}
        onKeyPress={onKeyPressHandler}
        autoFocus
      /> :
      <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
})