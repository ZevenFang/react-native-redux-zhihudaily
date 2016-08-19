import React, {Component} from 'react';
import {Text} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ZhihuDailyActions from '../actions/zhihudaily';
import Article from '../components/Article';

@connect(
  state => ({
    zhihu: state.zhihu
  }),
  dispatch => bindActionCreators(ZhihuDailyActions, dispatch)
)
export default class ArticleContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Article {...this.props}/>
    );
  }

}