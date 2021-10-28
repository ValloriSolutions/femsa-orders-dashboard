/* eslint-disable @typescript-eslint/no-explicit-any */
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './modules';

export const history = createBrowserHistory();

const middlewares: any[] = [thunk].filter(Boolean);

const store = createStore(rootReducer, compose(composeWithDevTools(), applyMiddleware(...middlewares)));

export default store;
