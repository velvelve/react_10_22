import React, { FC, useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from './components/Button/Button';
import { Message, AUTHOR } from '../../types';
import { useParams } from 'react-router-dom';

interface FormProps {
  addMessage: (chatId: string, msg: Message) => void;
}

export const Form: FC<FormProps> = ({ addMessage }) => {
  const [text, setText] = useState('');
  const { chatId } = useParams();
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (chatId) {
      addMessage(chatId, {
        text: text,
        author: AUTHOR.USER,
      });
    }
    setText('');
  };

  const handleFormInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setText(ev.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={text}
        type="text"
        onChange={handleFormInput}
        inputProps={{ 'data-testid': 'input' }}
      />
      <Button disabled={!text} render={(label) => <div>{label}</div>}></Button>
    </form>
  );
};
