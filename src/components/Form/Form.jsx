import { useState } from 'react'
import { TextField } from '@mui/material'
import { Button } from './components/Button/Button'

export const Form = ({ addMessage }) => {
    const [text, setText] = useState("")

    const handleSubmit = (ev) => {
        ev.preventDefault();
        addMessage({
            text: text,
            author: "Unknown"
        });
    }

    const handleFormInput = (ev) => {
        setText(ev.target.value)
    }
    return <form onSubmit={handleSubmit}>
        <TextField type="text" onChange={handleFormInput} />
        <Button label="send" disabled={!text} />
    </form>
}