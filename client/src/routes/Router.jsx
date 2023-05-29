import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Cart = lazy(() => import('../pages/Cart'));
const Login = lazy(() => import('../pages/Login'));
const Error = lazy(() => import('../pages/Error'));
const Custom = lazy(() => import('../pages/Custom'));
const Survey = lazy(() => import('../pages/Survey'));
const Signup = lazy(() => import('../pages/Signup'));
const MyInfo = lazy(() => import('../pages/MyInfo'));
const Payment = lazy(() => import('../pages/Payment'));
const AllBoxes = lazy(() => import('../pages/AllBoxes'));
const Products = lazy(() => import('../pages/Products'));
const SendEmail = lazy(() => import('../pages/SendEmail'));
const EditMyInfo = lazy(() => import('../pages/EditMyInfo'));
const SurveyHome = lazy(() => import('../pages/SurveyHome'));
const SignupOauth = lazy(() => import('../pages/SignupOauth'));
const ConfirmEmail = lazy(() => import('../pages/ConfirmEmail'));
const EditPassword = lazy(() => import('../pages/EditPassword'));
const FindPassword = lazy(() => import('../pages/FindPassword'));
const OrderHistory = lazy(() => import('../pages/OrderHistory'));
const RequestEmail = lazy(() => import('../pages/RequestEmail'));
const SurveyResult = lazy(() => import('../pages/SurveyResult'));
const CompleteEmail = lazy(() => import('../pages/CompleteEmail'));
const SignupComplete = lazy(() => import('../pages/SignupComplete'));

export default function Router() {
  const { isLogin, admin } = useSelector((state) => state.authReducer);
  return (
    <Routes>
      <Route path="/" element={<SurveyHome />} />
      <Route path="/mealboxes/*" element={<AllBoxes />} />
      <Route
        path="/survey/question/:page"
        element={admin ? <AllBoxes /> : <Survey />}
      />
      <Route path="/survey/result" element={<SurveyResult />} />
      <Route path="/custom" element={<Custom />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/myinfo/orderhistory"
        element={isLogin ? <OrderHistory /> : <Login />}
      />
      <Route path="/products/*" element={<Products />} />
      <Route
        path="/login"
        element={isLogin ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isLogin ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/signup/oauth"
        element={isLogin ? <Navigate to="/" /> : <SignupOauth />}
      />
      <Route
        path="/signup/complete"
        element={isLogin ? <Navigate to="/" /> : <SignupComplete />}
      />
      <Route
        path="/myinfo"
        element={isLogin ? <MyInfo /> : <Navigate to="/login" />}
      />
      <Route
        path="/myinfo/edit"
        element={isLogin ? <EditMyInfo /> : <Navigate to="/login" />}
      />
      <Route
        path="/myinfo/edit/password"
        element={isLogin ? <EditPassword /> : <Navigate to="/login" />}
      />
      <Route path="/email/complete" element={<CompleteEmail />} />
      <Route path="/email/confirm" element={<ConfirmEmail />} />
      <Route
        path="/email/request"
        element={isLogin ? <RequestEmail /> : <Navigate to="/login" />}
      />
      <Route path="/email/send" element={<SendEmail />} />
      <Route
        path="/email/send/signup"
        element={<SendEmail pathName="signup" />}
      />
      <Route path="/email/send/password" element={<FindPassword />} />
      <Route
        path="/cart/payment/:orderId"
        element={isLogin ? <Payment /> : <Navigate to="/login" />}
      />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
}
