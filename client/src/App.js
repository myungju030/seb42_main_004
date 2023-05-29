import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProfile } from './reducers/userReducer';
import { setAuth } from './reducers/authReducer';
import getData from './util/getData';
import parseToken from './util/parseToken';
import useInitialize from './util/useInitialize';
import GlobalLayout from './routes/GlobalLayout';

function App() {
  const dispatch = useDispatch();
  const initialize = useInitialize();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    let logoutTimer;
    if (accessToken) {
      const { exp, roles } = parseToken(accessToken);
      dispatch(
        setAuth({
          isLogin: true,
          admin: roles.includes('ADMIN'),
        })
      );
      getData('/users').then((data) => {
        dispatch(
          setProfile({ imagePath: data.imagePath, name: data.name, email: '' })
        );
      });
      const remainingTime = Math.floor(
        (new Date(exp * 1000).getTime() - new Date().getTime()) / (60 * 1000)
      );
      logoutTimer = setTimeout(() => {
        initialize().then(() => {
          alert('자동 로그아웃되었습니다.');
        });
      }, remainingTime * 60 * 1000);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [accessToken]);

  return <GlobalLayout />;
}

export default App;
