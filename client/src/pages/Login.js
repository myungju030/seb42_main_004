import styled from 'styled-components';
import LoginUl from '../components/login/LoginUl';

function Login() {
  return (
    <ContainerMain className="margininside">
      <LoginUl />
    </ContainerMain>
  );
}

export default Login;

const ContainerMain = styled.main`
  justify-content: center;
`;
