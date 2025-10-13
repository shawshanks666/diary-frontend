import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store'; 
import '@mantine/core/styles.css';
import { MantineProvider,createTheme } from '@mantine/core';
const root = ReactDOM.createRoot(document.getElementById('root'));
const jade = [
  '#E3F5EB', // 0
  '#C1E7D3', // 1
  '#9DD8BB', // 2
  '#78C7A2', // 3
  '#56B48D', // 4
  '#3D9C7B', // 5
  '#2F8268', // 6
  '#246955', // 7
  '#1A5044', // 8
  '#0F3732', // 9
];
const neutral = [
  '#f8f9fa', // gray-0
  '#f1f3f5', // gray-1
  '#e9ecef', // gray-2
  '#dee2e6', // gray-3
  '#ced4da', // gray-4
  '#adb5bd', // gray-5
  '#868e96', // gray-6
  '#495057', // gray-7
  '#343a40', // gray-8
  '#212529', // gray-9
];

const theme = createTheme({
  colors: { jade,neutral },
  primaryColor: 'jade',
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <App />
    </MantineProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
