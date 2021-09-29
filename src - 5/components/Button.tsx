import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type propsType = DefaultButtonPropsType & {
    callBack: () => void
}

export const Button=({callBack, ...props}:propsType)=>{
    const onClickHandler=()=>{
        callBack()
    }
    return(
        <button onClick={onClickHandler} {...props} />
    )
}