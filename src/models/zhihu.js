import {getLatest} from '../services/zhihu-api';
import {Toast} from 'native-base';

export default {
  namespace: 'zhihu',
  state: {
    data: []
  },
  reducers: {
    setLatest(state, {data}){
      state.data = data.stories;
      return {...state};
    }
  },
  effects: {
    *getLatest(action, {put, call}){
      try {
        let {data} = yield call(getLatest);
        yield put({
          type: 'setLatest', data
        });
      } catch (err) {
        Toast.show({
          text: 'Network error',
          position: 'bottom',
          buttonText: 'Okay'
        })
      }
    }
  }
}