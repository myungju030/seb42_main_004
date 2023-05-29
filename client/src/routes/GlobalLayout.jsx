import { Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/commons/Loading';
import GlobalStyle from '../global/globalstyles';
import { useSelector } from 'react-redux';
import Header from '../components/commons/Header';
import styled from 'styled-components';
import checkFooter from '../util/checkFooter';
import ToTopButton from '../components/commons/ToTopButton';
import Footer from '../components/commons/Footer';
import Router from './Router';

export default function GlobalLayout() {
  const { admin } = useSelector((state) => state.authReducer);
  const { pathname, search } = useLocation();

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
