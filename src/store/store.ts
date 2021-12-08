import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '@root/store/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(thunk)),
);
