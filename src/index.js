import React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from "./redux";
import App from './pages/Home';

// Create redux store
const initialState = {};
const { store, persistor } = configureStore(initialState);

const HOC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default HOC;
