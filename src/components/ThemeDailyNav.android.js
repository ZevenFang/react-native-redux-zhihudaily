import React, {Component} from 'react';
import {StyleSheet,ToolbarAndroid} from 'react-native';

export default class ThemeDailyNav extends Component {

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
        titleColor="white"
        title="用户推荐日报" />
    );
  }

}

let toolbarActions = [
  {title: '返回', icon:require('../img/theme_add.png'), showWithText:false, show: 'always'}
];

let styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#00a2ed',
    height: 50
  }
});
