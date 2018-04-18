import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <h1>React Works</h1>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
