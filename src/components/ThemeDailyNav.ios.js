import React, {Component} from 'react';
import {StyleSheet,Image} from 'react-native';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav'
import Theme from '../utils/Theme';

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
    let theme = new Theme(this.props.zhihu.theme);
    let styles = StyleSheet.create({
      statusBar: {
        backgroundColor: theme.colors.statusBar
      },
      navBar: {
        backgroundColor: theme.colors.titleBar,
        height: 50,
        paddingLeft: 15
      },
      title: {
        color: '#rgba(255, 255, 255, 1)',
        left: -100
      },
      buttonText: {
        color: '#rgba(255, 255, 255, 1)'
      },
      navButton:{
        marginTop: 20,
        flex: 1
      },
      icon:{
        width:30,
        height:30
      }
    });
    return (
      <NavBar style={styles}>
        <NavButton style={styles.navButton} onPress={()=>{this.handleDrawer(this.props)}}>
          <NavButtonText style={styles.buttonText}>
            <Image style={styles.icon} source={require('../img/ic_menu_white.png')} resizeMode={'contain'}/>
          </NavButtonText>
        </NavButton>
        <NavTitle style={styles.title}>
          {this.props.zhihu.themeDaily.name}
        </NavTitle>
        <NavGroup>
          <NavButton style={styles.navButton}>
            <NavButtonText style={styles.buttonText}>
              <Image style={styles.icon} source={require('../img/theme_add.png')} resizeMode={'contain'}/>
            </NavButtonText>
          </NavButton>
        </NavGroup>
      </NavBar>
    );
  }

}
