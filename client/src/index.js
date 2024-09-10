import React from 'react';     
import { createRoot } from 'react-dom/client';
import {Provider} from 'react-redux';           
import {createStore, applyMiddleware, compose} from 'redux';     
import { thunk } from 'redux-thunk';    
import reducers from './reducers';         
import App from './App';       
import './index.css';       

const store = createStore(reducers, compose(applyMiddleware(thunk)));   

// Get the root element
const rootElement = document.getElementById('root');

// Create a root and render the app
const root = createRoot(rootElement);  

root.render(
    <Provider store={store}>
    <App />
    </Provider>
)      