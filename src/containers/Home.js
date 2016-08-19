import React, { Component, PropTypes } from 'react';
import Home from '../components/Home'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ZhihuDailyActions from '../actions/zhihudaily';

@connect(
  state => ({
    zhihu: state.zhihu
  }),
  dispatch => bindActionCreators(ZhihuDailyActions, dispatch)
)
export default class HomeContainer extends Component {

  render() {
    return (
      <Home {...this.props}/>
    );
  }
  
}