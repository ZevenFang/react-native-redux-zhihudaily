import React, {Component} from 'react';
import {View,StatusBar} from 'react-native';
import Splash from '../components/Splash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ZhihuDailyActions from '../actions/zhihudaily';
// import Toast from 'react-native-root-toast';

@connect(
  state => ({
    zhihu: state.zhihu
  }),
  dispatch => bindActionCreators(ZhihuDailyActions, dispatch)
)
export default class SplashContainer extends Component {

  render() {
    return (
      <Splash  {...this.props}/>
    );
  }

}