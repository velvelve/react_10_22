import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../store/profile/slice";

export const Signin: FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('')
        if (login === 'gb' && password === 'gb') {
            dispatch(auth(true));
            navigate(-1);
        } else {
            setError('Wrong login or password');
        }
    }

    return <>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
            <p>Login: </p>
            <input type="text" onChange={e => setLogin(e.target.value)} value={login} />
            <p> Password</p>
            <input type="text" onChange={e => setPassword(e.target.value)} value={password} />
            <br />
            <button>Sign In</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
    </>;
}