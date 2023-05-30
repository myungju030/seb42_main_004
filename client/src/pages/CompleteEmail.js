import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmEmailDiv from '../components/signup/ConfirmEmailDiv';

function CompleteEmail() {
  const navigate = useNavigate();

  const timeout = () => {
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  useEffect(() => {
    timeout();
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <ConfirmEmailDiv pathName="complete" />;
}

export default CompleteEmail;
