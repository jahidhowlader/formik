import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import Routes from './routes/Routes.jsx';
import { Provider } from 'react-redux'
import store from './app/store.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ChakraProvider>
      <RouterProvider router={Routes}>
        {/* <App /> */}
      </RouterProvider>
    </ChakraProvider>
  </Provider>
)
