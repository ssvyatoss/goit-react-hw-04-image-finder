import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import 'modern-normalize/modern-normalize.css'
import { GlobalStyle } from 'styles/General.styled';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
    <App />  
    <GlobalStyle />
    </>
);
