import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './session'
import videoReducer from './videos';
import commentReducer from './comments';
import channelReducer from './channels';
import playlistReducer from './playlist';

const rootReducer = combineReducers({
  session: reducer,
  videos: videoReducer,
  comments: commentReducer,
  channel: channelReducer,
  playlist: playlistReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
