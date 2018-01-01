import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AccountWorksheetToolbar from './AccountWorksheet';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

var element = React.createElement('h1', {className: 'greeting'}, 'Hello World!');
//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<AccountWorksheetToolbar />, document.getElementById('root'));
registerServiceWorker();
