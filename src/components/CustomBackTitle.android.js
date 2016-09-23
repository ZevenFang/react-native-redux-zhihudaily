import React, {Component} from 'react';
import {StyleSheet,ToolbarAndroid} from 'react-native';

export default class CustomBackTitle extends Component {

  title = '首页';

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ToolbarAndroid
        navIcon={require('../img/ic_back_white_android.png')}
        onIconClicked={()=>{this.props.onNavigate({type:'pop'})}}
        style={styles.toolbar}
        titleColor="white"
        title={this.props.title} />
    );
  }

}

/*var toolbarActions = [
  {title: '关注', icon:require('../img/ic_back_white_android.png'), showWithText:false, show: 'always'}
];*/

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#00a2ed',
    height: 50
  }
});
