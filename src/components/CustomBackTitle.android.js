import React, {Component} from 'react';
import {StyleSheet,ToolbarAndroid} from 'react-native';
import Theme from '../utils/Theme'

export default class CustomBackTitle extends Component {

  title = '首页';

  constructor(props) {
    super(props);
  }

  render() {
    let theme = new Theme(this.props.zhihu.theme);
    return (
      <ToolbarAndroid
        navIcon={require('../img/ic_back_white_android.png')}
        onIconClicked={()=>{this.props.onNavigate({type:'pop'})}}
        style={[styles.toolbar,{backgroundColor:theme.colors.titleBar}]}
        titleColor="white"
        title={this.props.title} />
    );
  }

}

/*let toolbarActions = [
  {title: '关注', icon:require('../img/ic_back_white_android.png'), showWithText:false, show: 'always'}
];*/

let styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#00a2ed',
    height: 50
  }
});
