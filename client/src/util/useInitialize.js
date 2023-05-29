import { useDispatch } from 'react-redux';
import { setAuth } from '../reducers/authReducer';
import { initializeCart } from '../reducers/cartReducer';
import { setProfile } from '../reducers/userReducer';

function useInitialize() {
  const dispatch = useDispatch();

  return () => {
    const initialize = new Promise((resolve) => {
      localStorage.removeItem('accessToken');
      dispatch(
        setAuth({
          isLogin: false,
          roles: [],
        })
      );
      dispatch(setProfile({ imagePath: null, name: '', email: '' }));
      dispatch(initializeCart());
      resolve();
    });
    return initialize;
  };
}

export default useInitialize;
