import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type PropsType = DefaultButtonPropsType & {
  callBack: () => void
}

export const Button = React.memo(({callBack, ...props}: PropsType) => {
  const onClickHandler = () => {
    callBack()
  }
  return (
    <button onClick={onClickHandler} {...props} />
  )
})