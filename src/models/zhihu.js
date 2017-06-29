import * as api from '../services/zhihu-api';

export default {
  namespace: 'zhihu',
  state: {
    theme: 'light', //应用主题
    list: {},
    news: {},
    extra: {},
    dates: [],
    topNews: [],
    comments: {
      long: {},
      short: {}
    },
    themesList: [],
    themes: {}
  },
  reducers: {
    setLatest(state, {data}){
      state.dates = [data.date];
      state.list[data.date] = data.stories;
      state.topNews = data.top_stories;
      return {...state};
    },
    setBefore(state, {data}){
      state.dates.push(data.date);
      state.list[data.date] = data.stories;
      return {...state};
    },
    setNews(state, {id, data}){
      state.news[id] = data;
      return {...state};
    },
    setNewsExtra(state, {id, data}){
      state.extra[id] = data;
      return {...state};
    },
    setLongComments(state, {id, data}){
      state.comments.long[id] = data.comments;
      return {...state};
    },
    setShortComments(state, {id, data}){
      state.comments.short[id] = data.comments;
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
        type: 'setBefore', data
      });
    },
    *getNews({id}, {put, call, select}){
      const {news} = yield select(state => state.zhihu);
      let data = {};
      if (!news[id]){
        let res = yield call(api.getNews, id);
        data = res.data;
      } else data = news[id];
      yield put({
        type: 'setNews', id, data
      });
    },
    *getNewsExtra({id}, {put, call, select}){
      const {extra} = yield select(state => state.zhihu);
      let data = {};
      if (!extra[id]){
        let res = yield call(api.getNewsExtra, id);
        data = res.data;
      } else data = extra[id];
      yield put({
        type: 'setNewsExtra', id, data
      });
    },
    *getLongComments({id}, {put, call, select}){
      const {comments} = yield select(state => state.zhihu);
      let data = {};
      if (!comments.long[id]){
        let res = yield call(api.getLongComments, id);
        data = res.data;
      } else data = comments.long[id];
      yield put({
        type: 'setLongComments', id, data
      });
    },
    *getShortComments({id}, {put, call, select}){
      const {comments} = yield select(state => state.zhihu);
      let data = {};
      if (!comments.short[id]){
        let res = yield call(api.getShortComments, id);
        data = res.data;
      } else data = comments.short[id];
      yield put({
        type: 'setShortComments', id, data
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