
import { Form } from './components/Form/Form';
//import { Form as FormClass } from './class-components/Form';
//import { Count as CountClass } from './class-components/Count';
import { useEffect, useState } from 'react';
//import { Count } from './components/Count';
//import { Child } from './components/Child';
import { Message } from './components/Message/Message';
import appStyle from './App.module.css'

export const App = () => {
  const [messageList, setMessageList] = useState([
    {
      text: "first message",
      author: "Alex"
    },
    {
      text: "second message",
      author: "Ivan"
    }
  ]);


  useEffect(() => {
    if (messageList.at(-1).author === "Unknown") {
      setTimeout(() => {
        const obj = { text: "Hello, Human!", author: "Robot" };
        const replacementList = [...messageList, obj];
        setMessageList(replacementList)
      }, 1500)
    }
  }, [messageList, setMessageList]);
  //const [name, setName] = useState('textFromApp');
  //const [count, setCount] = useState(0);
  //const arr = ['Ivanov', 'Petrov', 'Sidorov'];

  //const handleChange = (ev) => {
  //  setName(ev.target.value)
  //}


  return (
    <div >
      {/*<h2 style={{ backgroundColor: 'green' }}>Class components</h2>
      <Count count={10} />
      <hr />
      <FormClass />
      <CountClass />
      <hr />
      <h2>Fuctional components</h2>
      <h3>Parent component</h3>
      <p>{count}</p>
      <input onChange={handleChange} />
      <h3>Child component</h3>
      <Child name={name} handleCountChange={setCount} />
      {arr.map((item, index) => {
        return <div key={index}>{item}</div>
      })}
     
    */}
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
