import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from "./redux/store"
import './assets/scss/style.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import Loader from './layout/loader/Loader';
import { PersistGate } from 'redux-persist/integration/react';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<Loader />}>
        <HashRouter>
          <App />
        </HashRouter>
      </Suspense>
    </PersistGate>
  </Provider>
);

reportWebVitals();
