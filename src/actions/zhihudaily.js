/**
 * Created by fangf on 2016/8/3.
 */
// import * as Types from './ActionTypes';
import Http from '../utils/Http';
import Toast from 'react-native-root-toast';

export function fetchSplash() {
  return dispatch => {
    Http.get('start-image/1080*1776').then(function (d) {
      d.img = {uri:d.img};
      //展示1秒黑屏
      setTimeout(function () {
        dispatch({
          type: 'fetchSplash',
          splash: d
        });
      },1000);
    },function () {
      // Toast.show('请检查网络后重试');
      let splash = {
        img: require('../img/splash.png')
      };
      dispatch({
        type: 'fetchSplash',
        splash
      });
    });
    //停顿2秒后进入首页
    setTimeout(function () {
      dispatch({
        type: 'push',
        key: 'home'
      });
    },3000)
  }
}

export function fetchLatestArticles() {
  return dispatch => {
    Http.get('news/latest').then(function (d) {
      d.img = {uri:d.img};
      dispatch({
        type: 'fetchLatestArticles',
        latest: d
      });
    })
  }
}

export function fetchArticleContent(id) {
  return dispatch => {
    Http.get('news/'+id).then(function (d) {
      dispatch({
        type: 'fetchArticleContent',
        content: d
      });
    })
  }
}

export function fetchArticleExtra(id) {
  return dispatch => {
    Http.get('news/story-extra/'+id).then(function (d) {
      dispatch({
        type: 'fetchArticleExtra',
        extra: d
      });
    })
  }
}

export function fetchArticleContentAndExtra(id) {
  return dispatch => {
    Http.get('news/'+id).then(function (d) {
      Http.get('story-extra/'+id).then(function (e) {
        d.extra = e;
        dispatch({
          type: 'fetchArticleContentAndExtra',
          article: d
        });
        dispatch({
          type: 'push',
          key: 'article'
        });
      });
    })
  }
}

export function refreshArticles() {
  return dispatch => {
    dispatch({type:'onRefresh'});//正在刷新状态
    Http.get('news/latest').then(function (d) {
      d.img = {uri:d.img};
      dispatch({
        type: 'refreshArticles',
        latest: d
      });
    })
  }
}

export function fetchArticleBefore(dateText,before) {
  return dispatch => {
    Http.get('news/before/'+before).then(function (d) {
      dispatch({
        type:'fetchArticleBefore',
        stories: d.stories,
        dateText
      })
    })
  };
}

export function fetchThemeDailyList() {
  return dispatch => {
    Http.get('themes').then(function (d) {
      dispatch({
        type: 'fetchThemeDailyList',
        themeList: d.others
      });
    })
  }
}

export function fetchArticlesByTheme(themeId) {
  return (dispatch,getState) => {
    let {routes} = getState();
    if (routes.routes[routes.routes.length-1].key!='theme_daily')
      dispatch({
        type: 'push',
        key: 'theme_daily'
      });
    //清除数据,重新加载
    /*dispatch({
     type: 'fetchArticlesByTheme',
     themeId,
     themeDaily: {}
     });*/
    Http.get('theme/'+themeId).then(function (d) {
      dispatch({
        type: 'fetchArticlesByTheme',
        themeId,
        themeDaily: d
      });
    })
  }
}

export function refreshThemeArticles() {
  return (dispatch,getState) => {
    dispatch({type:'onRefresh'});//正在刷新状态
    let {zhihu} = getState();
    let themeId = zhihu.themeDaily.id;
    Http.get('theme/'+themeId).then(function (d) {
      dispatch({
        type: 'refreshThemeArticles',
        themeId,
        themeDaily: d
      });
    });
  }
}

export function resetSideBar() {
  return {
    type:'resetSideBar'
  }
}

export function showEditorHome(id) {
  return dispatch => {
    dispatch({
      type: 'showEditorHome',
      id
    });
    dispatch({
      type: 'push',
      key: 'editor'
    })
  }
}

export function switchTheme(theme) {
  return {
    type:'switchTheme',
    theme:theme
  }
}

export function setTitle(title) {
  return {
    type:'setTitle',
    title:title
  }
}

export function backToHome() {
  return (dispatch,getState) => {
    let {routes} = getState();
    if (routes.routes[routes.routes.length-1].key=='theme_daily')
      dispatch({
        type: 'pop'
      });
  }
}
