import { FC, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ChatList } from '../../components/ChatList';
import { Form } from '../../components/Form';
import { MessageList } from '../../components/MessageList/MessageList';
import style from './ChatPage.module.scss';
import { WithClasses } from '../../HOC/WithClasses';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessages } from '../../store/messages/selectors';
import { AUTHOR } from '../../types';
import { addMessage } from '../../store/messages/actions';

export const ChatPage: FC = () => {
  const { chatId } = useParams();
  const MessageListWithClass = WithClasses(MessageList);
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      chatId &&
      messages[chatId]?.length > 0 &&
      messages[chatId][messages[chatId].length - 1].author === AUTHOR.USER
    ) {
      setTimeout(() => {
        dispatch(
          addMessage(chatId, {
            text: 'Hello, Human!',
            author: AUTHOR.BOT,
          })
        );
      }, 1500);
    }
  }, [chatId, messages, dispatch]);

  if (chatId && !messages[chatId]) {
    return <Navigate to="/chats" replace />;
  }
  return (
    <>
      <ChatList />
      {/*<MessageList messages={chatId ? messages[chatId] : []} />*/}
      <MessageListWithClass
        messages={chatId ? messages[chatId] : []}
        classes={style.border}
      />
      <Form />
    </>
  );
};
