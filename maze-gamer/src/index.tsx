import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <h1>React Works</h1>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
