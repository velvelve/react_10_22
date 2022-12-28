import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logOut } from '../../services/firebase';
import { StoreState } from '../../store';
import { auth } from '../../store/profile/slice';
import style from './Header.module.scss';

const navigate = [
  {
    name: 'Main',
    path: '/',
  },
  {
    name: 'Chats',
    path: '/chats',
  },
  {
    name: 'Profile',
    path: '/profile',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Articles',
    path: '/articles',
  },
];

export const Header: FC = () => {
  const isAuth = useSelector((state: StoreState) => {
    return state.profile.isAuth;
  });
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(auth(false));
    }
  };

  return (
    <>
      <header style={{ backgroundColor: 'lightgray', padding: '8px' }}>
        <ul className={style.ul}>
          {navigate.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  color: isActive ? 'green' : 'blue',
                })}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </header>
      <main>
        {isAuth && <button onClick={handleLogout}>Sign Out</button>}
        {!isAuth && <button onClick={() => nav('/signin')}>Sign In</button>}
        {!isAuth && <button onClick={() => nav('/signup')}>Sign Up</button>}
        <Outlet />
      </main>
    </>
  );
};
