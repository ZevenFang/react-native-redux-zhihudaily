import React, { Component, PropTypes } from 'react';
import Editor from '../components/Editor'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ZhihuDailyActions from '../actions/zhihudaily';

@connect(
  state => ({
    zhihu: state.zhihu
  }),
  dispatch => bindActionCreators(ZhihuDailyActions, dispatch)
)
export default class EditorContainer extends Component {

  render() {
    return (
      <Editor {...this.props}/>
    );
  }
  
}