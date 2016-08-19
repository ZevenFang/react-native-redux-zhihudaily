import { combineReducers } from 'redux';
import counter from './counter';
import routes from './routes';
import zhihu from './zhihudaily';

export default combineReducers({
  counter,
  routes,
  zhihu
});
