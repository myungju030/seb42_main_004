import { useSelector } from 'react-redux';
import RequestEmailDiv from '../components/signup/RequestEmailDiv';

function RequestEmail() {
  const { email } = useSelector((state) => state.useReducer);

  return <RequestEmailDiv email={email} />;
}

export default RequestEmail;
