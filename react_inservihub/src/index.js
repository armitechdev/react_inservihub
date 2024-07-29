import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HelmetProvider} from "react-helmet-async";
import { Provider } from 'react-redux';
import { applyMiddleware, compose, legacy_createStore } from 'redux';
import reducers from './store/reducers';
import sagas from './store/saga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(sagas);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <HelmetProvider>
          <Provider store={store}>
              <App/>
          </Provider>
        </HelmetProvider>
    </React.StrictMode>
);

reportWebVitals();
