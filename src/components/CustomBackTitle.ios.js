import React, {Component} from 'react';
import {StyleSheet,Image,Text} from 'react-native';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav'
import Theme from '../utils/Theme'

export default class CustomBackTitle extends Component {

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
    let title = {color: 'white', fontWeight:'100'};
    title.left = this.props.left;
    return (
      <NavBar style={styles}>
        <NavButton style={styles.navButton} onPress={()=>{this.props.onNavigate({type:'pop'})}}>
          <NavButtonText style={styles.buttonText}>
            <Image style={styles.icon} source={require('../img/ic_back_white.png')} resizeMode={'contain'}/>
          </NavButtonText>
        </NavButton>
        <NavTitle style={title}>{this.props.title}</NavTitle>
      </NavBar>
    );
  }

}