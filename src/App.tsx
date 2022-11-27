import { Form } from './components/Form/Form';
import { FC, useEffect, useState } from 'react';
import { MessageList } from './components/MessageList/MessageList';
import { Messages } from './types';
import { Message } from './types';
import { AUTHOR } from './types';

export const App: FC = () => {
  const [messageList, setMessageList] = useState<Messages>([]);

  const addMessage = (newMessage: Message) => {
    const replacementList = [...messageList, newMessage];
    setMessageList(replacementList);
  };

  useEffect(() => {
    if (
      messageList.length > 0 &&
      messageList[messageList.length - 1].author === AUTHOR.USER
    ) {
      setTimeout(() => {
        const obj = { text: 'Hello, Human!', author: AUTHOR.BOT };
        const replacementList = [...messageList, obj];
        setMessageList(replacementList);
      }, 1500);
    }
  }, [messageList]);

  return (
    <div>
      <MessageList messages={messageList} />
      <Form addMessage={addMessage} />
    </div>
  );
};

export default App;
