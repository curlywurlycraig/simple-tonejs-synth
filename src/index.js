import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './app';
import './index.css';
import reducer from './store/reducer';
import Audio from './audio';

const store = createStore(reducer);
const audio = new Audio();

ReactDOM.render(
  <Provider store={store}>
    <App audio={audio} />
  </Provider>,
  document.getElementById('root')
);
