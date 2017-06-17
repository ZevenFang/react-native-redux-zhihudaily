import * as api from '../services/zhihu-api';

export default {
  namespace: 'zhihu',
  state: {
    list: {},
    news: {},
    extra: {},
    dates: [],
    topNews: [],
    comments: {
      long: [],
      short: []
    },
    themesList: [],
    themes: {}
  },
  reducers: {
    setLatest(state, {data}){
      state.dates.push(data.date);
      state.list[data.date] = data.stories;
      state.topNews = data.top_stories;
      return {...state};
    },
    setBefore(state, {data}){
      state.dates.push(data.date);
      state.list[data.date] = data.stories;
      return {...state};
    },
    setNews(state, {data}){
      state.news = data;
      return {...state};
    },
    setNewsExtra(state, {data}){
      state.extra = data;
      return {...state};
    },
    setLongComments(state, {data}){
      state.comments.long = data.comments;
      return {...state};
    },
    setShortComments(state, {data}){
      state.comments.short = data.comments;
      return {...state};
    },
    setThemes(state, {data}){
      state.themesList = data.others;
      return {...state};
    },
    setTheme(state, {id, data}){
      state.themes[id] = data;
      return {...state};
    }
  },
  effects: {
    *getLatest(action, {put, call}){
      let {data} = yield call(api.getLatest);
      yield put({
        type: 'setLatest', data
      });
    },
    *getBefore(action, {put, call, select}){
      const {dates} = yield select(state => state.zhihu);
      let {data} = yield call(api.getNewsBefore, dates[dates.length-1]);
      yield put({
        type: 'setLatest', data
      });
    },
    *getNews({id}, {put, call}){
      let {data} = yield call(api.getNews, id);
      yield put({
        type: 'setNews', data
      });
    },
    *getNewsExtra({id}, {put, call}){
      let {data} = yield call(api.getNewsExtra, id);
      yield put({
        type: 'setNewsExtra', data
      });
    },
    *getLongComments({id}, {put, call}){
      let {data} = yield call(api.getLongComments, id);
      yield put({
        type: 'setLongComments', data
      });
    },
    *getShortComments({id}, {put, call}){
      let {data} = yield call(api.getShortComments, id);
      yield put({
        type: 'setShortComments', data
      });
    },
    *getThemes(action, {put, call}){
      let {data} = yield call(api.getThemes);
      yield put({
        type: 'setThemes', data
      });
    },
    *getTheme({id}, {put, call, select}){
      const {themes} = yield select(state => state.zhihu);
      let data = {};
      if (!themes[id]){
        let res = yield call(api.getTheme, id);
        data = res.data;
      } else data = themes[id];
      yield put({
        type: 'setTheme', id, data
      });
    }
  }
}