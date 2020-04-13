import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import reducers from './reducer';
import rootSaga from './sagas'
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers, composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);
sagaMiddleware.run(rootSaga);

export default store;