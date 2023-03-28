import { store } from '../../global/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const persistor = persistStore(store);

function AppProvider({ children }) {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          >
            <BrowserRouter>{children}</BrowserRouter>
          </GoogleOAuthProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  );
}

export default AppProvider;