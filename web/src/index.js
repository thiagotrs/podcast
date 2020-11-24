import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { Provider } from 'react-redux'
import App from './App'
import store from './store/store'

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #1b1c22;
        color: #9ca8b0;
    }
`

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
        <GlobalStyle />
    </React.StrictMode>,
    document.getElementById('root')
);
