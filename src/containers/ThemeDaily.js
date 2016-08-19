import React, { Component, PropTypes } from 'react';
import ThemeDaily from '../components/ThemeDaily'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ZhihuDailyActions from '../actions/zhihudaily';

@connect(
  state => ({
    zhihu: state.zhihu
  }),
  dispatch => bindActionCreators(ZhihuDailyActions, dispatch)
)
export default class ThemeDailyContainer extends Component {

  render() {
    return (
      <ThemeDaily {...this.props}/>
    );
  }
  
}