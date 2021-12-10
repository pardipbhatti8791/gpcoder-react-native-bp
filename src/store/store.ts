import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '@root/store/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const middlewares = [thunk, logger];

export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middlewares)),
);
