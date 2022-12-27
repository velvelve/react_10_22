import { FC } from 'react';
import cat from '../assets/img/cat.jpeg';

export const Main: FC = () => (
    <>
        <h2>Main page</h2>
        <img src={cat} alt="cat" />
    </>
);
