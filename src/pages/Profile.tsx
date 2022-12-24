import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleProfile, changeName } from '../store/profile/slice';
import { selectName, selectVisible } from '../store/profile/selectors';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectName);
  const visibility = useSelector(selectVisible);
  const [value, setValue] = useState('');
  return (
    <>
      <h2>Profile page</h2>
      <p>Visible: {visibility ? 'yes' : 'no'}</p>
      <input type="checkbox" checked={visibility} readOnly />
      <button onClick={() => dispatch(toggleProfile())}>
        Change visibility
      </button>
      <hr />
      <p>name: {name}</p>
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
      <button onClick={() => dispatch(changeName(value))}>Change name</button>
    </>
  );
};
