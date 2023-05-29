import { Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Loading from '../components/commons/Loading';
import Header from '../components/commons/Header';
import ToTopButton from '../components/commons/ToTopButton';
import Footer from '../components/commons/Footer';
import GlobalStyle from '../global/globalstyles';
import { setAuth } from '../reducers/authReducer';
import { setProfile } from '../reducers/userReducer';
import checkFooter from '../util/checkFooter';
import useInitialize from '../util/useInitialize';
import parseToken from '../util/parseToken';
import getData from '../util/getData';
import Router from './Router';

export default function GlobalLayout() {
  const { admin } = useSelector((state) => state.authReducer);
  const { pathname, search } = useLocation();
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
        initialize();
      }, remainingTime * 60 * 1000);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [accessToken]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return (
    <>
      <GlobalStyle admin={admin && 1} />
      <Header />
      <BodyMargin
        className="marginbase"
        height={checkFooter() ? 1 : null}
        pathname={pathname}
      >
        <Suspense fallback={<Loading />}>
          <Router />
        </Suspense>
        <ToTopButton />
      </BodyMargin>
      <Footer />
    </>
  );
}

const BodyMargin = styled.div`
  padding-top: ${(props) =>
    props.pathname === '/' ? '0' : 'calc(1rem + 50px)'};
  padding-bottom: 4rem;
  min-height: calc(100vh - 280px);

  @media screen and (max-width: 768px) {
    min-height: calc(100vh - ${(props) => (props.height ? '0px' : '230px')});
    padding-bottom: calc(${(props) => (props.height ? '90px' : '0px')} + 4rem);
  }

  @media screen and (max-width: 480px) {
    min-height: calc(100vh - ${(props) => (props.height ? '0px' : '180px')});
    padding-bottom: ${(props) =>
      props.pathname === '/'
        ? '0'
        : `calc(${(props) => (props.height ? '76px' : '0px')} + 4rem)`};
  }
`;
