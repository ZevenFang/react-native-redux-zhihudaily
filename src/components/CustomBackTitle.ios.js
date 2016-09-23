import React, {Component} from 'react';
import {StyleSheet,Image,Text} from 'react-native';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav'

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#2986E2'
  },
  navBar: {
    backgroundColor: '#00a2ed',
    height: 50,
    paddingLeft: 0
  },
  buttonText: {
    color: '#rgba(255, 255, 255, 1)'
  },
  number:{
    alignSelf:'center',fontSize:15,color:'white'
  },
  navButton:{
    marginTop: 10,
    flex: 1
  },
  icon:{
    width:30,
    height:30
  }
});

export default class CustomBackTitle extends Component {

  render() {
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