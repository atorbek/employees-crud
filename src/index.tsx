import App from 'components/App';
import {ChakraProvider} from '@chakra-ui/react';
import Fonts from 'components/Fonts';
import {Provider} from 'react-redux';
import React from 'react';
import configureStore from 'store';
import {createRoot} from 'react-dom/client';
import {defaultGetState} from 'actions/common';
import theme from './theme';

const container = document.getElementById('root');
const root = createRoot(container!);
const store = configureStore(defaultGetState());

root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Fonts />
      <App />
    </ChakraProvider>
  </Provider>
);
