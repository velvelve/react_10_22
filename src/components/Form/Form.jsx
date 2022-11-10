
import { useState } from 'react'
import style from './Form.module.css'

export const Form = ({ handleSendText }) => {
    const [text, setText] = useState("")

    const handleClick = () => {
        handleSendText((oldList) => {
            const obj = { text: text, author: "Unknown" };
            const replacementList = [...oldList, obj];
            return replacementList
        })
    }

    const handleFormInput = (ev) => {
        setText(ev.target.value)
    }
    return <form className={style.form}>
        <input type="text" onChange={handleFormInput} />
        <button type="button" onClick={handleClick}>Send</button>
    </form>
}

