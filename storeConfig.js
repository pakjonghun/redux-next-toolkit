import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import sagaRoot from './sagas';

const sagaMiddleware = createSagaMiddleware();

const makeStore = () => {
  const setupStore = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(sagaRoot);
  return setupStore;
};

const wrapper = createWrapper(makeStore, {
  debug: true,
});

export default wrapper;
