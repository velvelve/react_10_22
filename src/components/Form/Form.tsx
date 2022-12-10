import React, { FC, useContext, useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from './components/Button/Button';
import { AUTHOR } from '../../types';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../../utils/ThemeContext';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../store/messages/actions';

export const Form: FC = () => {
  const [text, setText] = useState('');
  const { chatId } = useParams();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (chatId) {
      dispatch(addMessage(chatId, {
        author: AUTHOR.USER,
        text,
      }))
    }
    setText('');
  };

  const handleFormInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setText(ev.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          value={text}
          type="text"
          onChange={handleFormInput}
          inputProps={{ 'data-testid': 'input' }}
        />
        <Button
          disabled={!text}
          render={(label) => <div>{label}</div>}
        ></Button>
      </form>
      <p>Theme: {theme === 'light' ? <>&#127774;</> : <>&#127769;</>}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </>
  );
};
