import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ServiceProvider } from './component/ServiceContext/ServiceContext';

import ErrorBoundary from './component/ErrorBoundary/ErrorBoundary';
import store from './store';
import App from './component/App/App';

import BookService from './api/BookService';
const bookService = new BookService();

ReactDOM.render(
  <StoreProvider store={store}>
    <ErrorBoundary>
      <ServiceProvider value={bookService}>
        <BrowserRouter basename="/store">
          <App />
        </BrowserRouter>
      </ServiceProvider>
    </ErrorBoundary>
  </StoreProvider>,
  document.getElementById('root')
);
