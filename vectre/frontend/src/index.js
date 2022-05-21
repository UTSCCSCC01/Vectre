import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import sagas from './redux/sagas';
import allReducers from './redux/reducers';
import Routes from './routes';

import { ColorModeScript, ChakraProvider } from '@chakra-ui/react'
import theme from './lib/theme'

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: allReducers, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware)
})

sagaMiddleware.run(sagas);

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);