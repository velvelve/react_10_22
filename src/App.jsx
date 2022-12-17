
import { Form } from './components/Form/Form';
import { useEffect, useState } from 'react';
import { Message } from './components/Message/Message';
import appStyle from './App.module.css'

export const App = () => {
  const [messageList, setMessageList] = useState([]);


  useEffect(() => {
    if (messageList.at(-1).author === "Unknown") {
      setTimeout(() => {
        const obj = { text: "Hello, Human!", author: "Robot" };
        const replacementList = [...messageList, obj];
        setMessageList(replacementList)
      }, 1500)
    }
  }, [messageList, setMessageList]);

  return (
    <div >
      {messageList.map((item, index) => {
        return <div key={index} >
          <p className={appStyle.messagetext}>{item.text}</p>
          <p className={appStyle.messageauthor}>{item.author}</p>
        </div>
      })
      }
      <Form handleSendText={setMessageList} />
      <Message text={"Hello World!"} />
    </div>
  );
}

export default App;
