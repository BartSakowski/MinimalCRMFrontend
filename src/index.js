import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'
import history from './history';

import store from './reducers/index'

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
