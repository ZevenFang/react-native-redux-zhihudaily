const initialState = {
  splash: { //默认闪屏界面
    img: require('../img/splash_black.png'),
    text: '每天三次，每次七分钟'
  },
  isDrawerOpened:false,
  latest:[],
  title:'首页',
  refreshing:false
};

const actionsMap = {
  fetchSplash(state,action){
    state.splash = action.splash;
    return {...state};
  },
  fetchLatestArticles(state,action){
    state.latest = action.latest;
    return {...state};
  },
  refreshArticles(state,action){
    state.latest = action.latest;
    state.refreshing = false;
    return {...state};
  },
  fetchArticleBefore(state,action){
    state.latest.stories.push(state.latest.stories[0]);
    return {...state};
  },
  fetchThemeDailyList(state,action){
    state.themeList = action.themeList;
    return {...state}
  },
  fetchArticlesByTheme(state,action){
    state.themeDaily = action.themeDaily;
    state.themeDaily.id = action.themeId;
    return {...state};
  },
  refreshThemeArticles(state,action){
    state.themeDaily = action.themeDaily;
    state.themeDaily.id = action.themeId;
    state.refreshing = false;
    return {...state};
  },
  showEditorHome(state,action){
    state.editorId = action.id;
    return {...state}
  },
  fetchArticleContentAndExtra(state,action){
    state.article = action.article;
    return {...state}
  },
  onRefresh(state){
    state.refreshing = true;
    return {...state}
  },
  setTitle(state,action){
    state.title = action.title;
    return {...state}
  }
};

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};