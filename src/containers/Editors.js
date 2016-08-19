import React, { Component, PropTypes } from 'react';
import Editors from '../components/Editors'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ZhihuDailyActions from '../actions/zhihudaily';

@connect(
  state => ({
    zhihu: state.zhihu
  }),
  dispatch => bindActionCreators(ZhihuDailyActions, dispatch)
)
export default class EditorsContainer extends Component {

  render() {
    return (
      <Editors {...this.props}/>
    );
  }
  
}