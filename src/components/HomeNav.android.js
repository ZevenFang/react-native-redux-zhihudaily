import React, {Component} from 'react';
import {StyleSheet,ToolbarAndroid} from 'react-native';

export default class HomeNav extends Component {

  title = '首页';
  drawer = false;

  constructor(props) {
    super(props);
  }

  handleDrawer(props){
    this.drawer?props.closeDrawer():props.openDrawer();
    // this.drawer = !this.drawer;
  };

  render() {
    return (
      <ToolbarAndroid
        navIcon={require('../img/ic_menu_white_android.png')}
        onIconClicked={() => {this.handleDrawer(this.props)}}
        actions={toolbarActions}
        style={styles.toolbar}
        overflowIcon={require('../img/ic_more_white_android.png')}
        titleColor="white"
        title="首页" />
    );
  }

}

var toolbarActions = [
  {title: '提醒', icon:require('../img/ic_message_white.png'), showWithText:false, show: 'always'},
  {title: '夜间模式', show:'never'},
  {title: '设置选项', show:'never'}
];

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#00a2ed',
    height: 50
  }
});
