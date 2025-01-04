import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import volsReducer from './reducers/VolsReducer';

const rootReducer = combineReducers({
  vols: volsReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

