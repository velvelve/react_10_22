import messageStyle from './Message.module.css'

export const Message = ({ text }) => {
    return <>
        <p className={messageStyle.message}>Text: {text}</p>
    </>
}
