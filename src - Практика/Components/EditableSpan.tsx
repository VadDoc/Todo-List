import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
  title: string
  changeTitle: (title: string) => void
}

export const EditableSpan = (props: PropsType) => {
  const [editMode, setEditMode] = useState(false)
  const [value, setValue] = useState('')

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTitle(e.currentTarget.value)
  }

  const onDoubleClick = () => {
    setEditMode(true)
  }

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) setEditMode(false)
  }

  const onBlur = () => {
    setEditMode(false)
  }

  return (
    <div>
      {editMode ?
        <input value={props.title} onChange={onChangeInput} onKeyPress={onKeyPress} onBlur={onBlur} autoFocus/> :
        <h3 onDoubleClick={onDoubleClick}>{props.title}</h3>}
    </div>
  )
}