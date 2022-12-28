import React, { FC, useContext, useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from './components/Button/Button';
import { AUTHOR } from '../../types';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../../utils/ThemeContext';
import { Wrapper } from './styled';
import { push, ref } from 'firebase/database';
import { db } from '../../services/firebase';


export const Form: FC = () => {
  const [text, setText] = useState('');
  const { chatId } = useParams();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (chatId) {
      push(ref(db, `messages/${chatId}/messages`), {
        author: AUTHOR.USER,
        text,
      });
    }
    setText('');
  };

  const handleFormInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setText(ev.target.value);
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
};
