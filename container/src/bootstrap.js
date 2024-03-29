import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
ReactDom.render(
    <App />,
    document.querySelector('#root')
);
serviceWorkerRegistration.register();