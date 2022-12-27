import { CircularProgress } from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/firebase';

export const Signup: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signUp(login, password);
      navigate('/signin');
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
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
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
        <button>Create Account</button>
      </form>
      {loading && <CircularProgress />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};
