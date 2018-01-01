import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import AccountWorksheetToolbar from './AccountWorksheet';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<AccountWorksheetToolbar />, document.getElementById('root'));
registerServiceWorker();
