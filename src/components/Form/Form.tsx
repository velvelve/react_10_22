import React, { FC, useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from './components/Button/Button';
import { Message, AUTHOR } from '../../types';

interface FormProps {
  addMessage: (msg: Message) => void;
}

export const Form: FC<FormProps> = ({ addMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    addMessage({
      text: text,
      author: AUTHOR.USER,
    });
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
