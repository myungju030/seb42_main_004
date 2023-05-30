import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GetTemplate from '../components/commons/GetTemplate';
import MyInfoButton from '../components/myInfo/MyInfoButton';
import PasswordInputDiv from '../components/myInfo/PasswordInputDiv';
import patchData from '../util/patchData';
import useValid from '../util/useValid';

function FindPassword() {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email');
  const mailKey = new URLSearchParams(location.search).get('mailKey');
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const [validText, isValid, setValidText] = useValid(inputValue);
  const { password, passwordConfirm } = inputValue;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleClick = () => {
    let obj = {};
    for (const el in isValid) {
      if (!inputValue[el]) {
        obj = { ...obj, [el]: '필수 항목입니다.' };
      }
    }
    setValidText({ ...validText, ...obj });
    if (isValid.password && isValid.passwordConfirm) {
      patchData('/users/recovery', {
        email,
        mailKey,
        afterPassword: password,
      }).then(() => {
        navigate('/login');
      });
    } else if (!isValid.password) {
      inputRef.current[0].focus();
    } else {
      inputRef.current[1].focus();
    }
  };

  return (
    <GetTemplate res="true" title="비밀번호 찾기">
      <ContainerMain className="margininside">
        <PasswordDiv>
          <div>
            <span>
              <h2>{`새로운 비밀번호를 입력해주세요:)`}</h2>
            </span>
            <ContentDiv>
              <PasswordInputDiv
                id="password"
                name="password"
                labelName="새 비밀번호"
                placeholder="영문, 숫자를 포함하여 8~20글자로 입력해주세요."
                value={password}
                inputRef={(el) => (inputRef.current[0] = el)}
                validText={validText.password}
                onChange={handleInput}
              />
              <PasswordInputDiv
                id="passwordConfirm"
                name="passwordConfirm"
                labelName="새 비밀번호 확인"
                placeholder="확인을 위해 비밀번호를 한번 더 입력해주세요."
                value={passwordConfirm}
                inputRef={(el) => (inputRef.current[1] = el)}
                validText={validText.passwordConfirm}
                onChange={handleInput}
              />
            </ContentDiv>
            <MyInfoButton onClick={handleClick} text="확인" />
          </div>
        </PasswordDiv>
      </ContainerMain>
    </GetTemplate>
  );
}

export default FindPassword;

const ContainerMain = styled.main`
  justify-content: center;
`;
const PasswordDiv = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    width: 100%;
    height: 280px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    border: 3px solid var(--signature);
    background-color: var(--white_020);
  }

  button {
    width: 20%;

    @media (max-width: 480px) {
      width: 30%;
    }
  }

  @media (max-width: 480px) {
    width: 90%;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 80%;
  }
`;
const ContentDiv = styled.div`
  width: 80%;

  input {
    width: 90%;
  }
`;
