import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export default function Main() {
  return (
    <ContainerMain className="margininside">
      <Outlet />
    </ContainerMain>
  );
}

const ContainerMain = styled.main`
  justify-content: center;
`;
