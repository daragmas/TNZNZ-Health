import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
<<<<<<< HEAD


import {
  BrowserRouter
} from "react-router-dom"

=======
import { BrowserRouter} from "react-router-dom"
import store from './redux/store';
import {Provider} from 'react-redux'
>>>>>>> e74400426efff7e96e7c3c50102ad536c26ca541



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
