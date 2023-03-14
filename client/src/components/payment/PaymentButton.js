import { useEffect } from 'react';

const PaymentButton = () => {
  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init('imp88722047');
    const data = {
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      name: '결제 테스트',
      amount: '1',
      buyer_name: '강명주',
      buyer_tel: '01012345678',
      buyer_email: 'myungju030@gmail.com',
      buyer_addr: '주소',
      buyer_postalcode: '1234',
    };
    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    const { success, error_msg } = response;
    if (success) {
      alert('결제 성공');
    } else {
      alert(`결제 실패 : ${error_msg}`);
    }
  };

  return <button onClick={onClickPayment}>결제하기</button>;
};

export default PaymentButton;
