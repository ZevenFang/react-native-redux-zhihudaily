'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import Theme from '../utils/Theme'

export default class ArticleNav extends Component{
  _onPressShareButton() {
    // TODO:
  }
  _onPressCollectButton() {
    // TODO:
  }
  _onPressCommentButton() {
    // TODO:
  }
  _onPressPraiseButton() {
    // TODO:
  }
  render() {
    let theme = new Theme(this.props.zhihu.theme);
    let TouchableElement = TouchableNativeFeedback;
    let {extra} = this.props.zhihu.article;
    if (extra.comments>1000) extra.comments = (extra.comments/1000).toFixed(1)+'k';
    if (extra.popularity>1000) extra.popularity = (extra.popularity/1000).toFixed(1)+'k';
    return(
      <View {...this.props}>
        <View style={[styles.actionsContainer,{backgroundColor:theme.colors.titleBar}]}>
          <TouchableElement onPress={()=>{this.props.onNavigate({type:'pop'})}}>
            <View style={styles.actionItem}>
              <Image
                style={styles.backIcon}
                source={require('../img/ic_back_white.png')}
                resizeMode='contain' />
            </View>
          </TouchableElement>
          <View style={{flex: 1}} />
          <TouchableElement onPress={this._onPressShareButton}>
            <View style={styles.actionItem}>
              <Image
                style={styles.actionIcon}
                source={require('../img/ic_share_white.png')}
                resizeMode='contain' />
            </View>
          </TouchableElement>
          <TouchableElement onPress={this._onPressCollectButton}>
            <View style={styles.actionItem}>
              <Image
                style={styles.actionIcon}
                source={require('../img/ic_collect_white.png')}
              resizeMode='contain' />
            </View>
          </TouchableElement>
          <TouchableElement onPress={this._onPressCommentButton}>
            <View style={styles.actionItem}>
              <Image
                style={styles.actionIconWithCount}
                source={require('../img/ic_comment_white.png')}
                resizeMode='contain' />
              <Text style={styles.count}>
                {extra.comments}
              </Text>
            </View>
          </TouchableElement>
          <TouchableElement onPress={this._onPressPraiseButton}>
            <View style={styles.actionItem}>
              <Image
                style={styles.actionIconWithCount}
                source={require('../img/ic_praise_white.png')}
                resizeMode='contain' />
              <Text style={styles.count}>
                {extra.popularity}
              </Text>
            </View>
          </TouchableElement>
        </View>

      </View>
    );
  }
}

let styles = StyleSheet.create({
  actionsContainer: {
    backgroundColor: '#00a2ed',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 32,
    height: 32,
    marginLeft: 8,
    marginRight: 8,
  },
  actionItem: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  actionIcon: {
    width: 32,
    height: 32,
  },
  actionIconWithCount: {
    width: 32,
    height: 32,
    marginLeft: 5,
  },
  count: {
    fontSize: 16,
    color: 'white',
    marginRight: 5,
  }
});