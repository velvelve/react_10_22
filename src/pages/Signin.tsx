import { CircularProgress } from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/firebase';

export const Signin: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      await signIn(login, password);
      navigate('/chats');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <p>Login:</p>
        <input
          type="email"
          onChange={(e) => setLogin(e.target.value)}
          value={login}
          required
        />
        <p>Password:</p>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <br />
        <button>Login</button>
      </form>
      {loading && <CircularProgress />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};
