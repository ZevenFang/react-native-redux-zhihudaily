import React, {Component} from 'react';
import {StyleSheet,ToolbarAndroid} from 'react-native';
import Theme from '../utils/Theme';

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

  onActionSelected(position,props) {
    if (position === 1) { // 夜间模式|日间模式
      props.switchTheme(props.zhihu.theme == Theme.DARK?Theme.LIGHT:Theme.DARK);
    }
  };

  render() {
    let zhihu = this.props.zhihu;
    toolbarActions[1].title = zhihu.theme == Theme.DARK?'日间模式':'夜间模式';
    let theme = new Theme(zhihu.theme);
    let styles = StyleSheet.create({
      toolbar: {
        backgroundColor: theme.colors.titleBar,
        height: 50
      }
    });
    return (
      <ToolbarAndroid
        navIcon={require('../img/ic_menu_white_android.png')}
        onIconClicked={() => {this.handleDrawer(this.props)}}
        actions={toolbarActions}
        onActionSelected={(position)=>{this.onActionSelected(position,this.props)}}
        style={styles.toolbar}
        overflowIcon={require('../img/ic_more_white_android.png')}
        titleColor="white"
        title={this.props.zhihu.title} />
    );
  }

}

let toolbarActions = [
  {title: '提醒', icon:require('../img/ic_message_white.png'), showWithText:false, show: 'always'},
  {title: '夜间模式', show:'never'},
  {title: '设置选项', show:'never'}
];
