import { Form } from './components/Form/Form';
import React, { useEffect, useState } from 'react';
import { MessageList } from './components/MessageList/MessageList';
import { Form as FormClass } from './components/FormClass/Form';

export const App = () => {
  const [messageList, setMessageList] = useState([
    {
      text: 'first message',
      author: 'Alex',
    },
    {
      text: 'second message',
      author: 'Ivan',
    },
  ]);

  useEffect(() => {
    if (messageList.at(-1).author === 'Unknown') {
      setTimeout(() => {
        const obj = { text: 'Hello, Human!', author: 'Robot' };
        const replacementList = [...messageList, obj];
        setMessageList(replacementList);
      }, 1500);
    }
  }, [messageList, setMessageList]);

  const addMessage = (newObj) => {
    const replacementList = [...messageList, newObj];
    setMessageList(replacementList);
  };

  return (
    <div>
      <MessageList messages={messageList} />
      <Form addMessage={addMessage} />
      <FormClass />
    </div>
  );
};

export default App;
