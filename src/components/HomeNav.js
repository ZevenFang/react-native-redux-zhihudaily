import React, {Component} from 'react';
import {StyleSheet,Image} from 'react-native';
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
  title: {
    color: '#rgba(255, 255, 255, 1)',
    left: -70
  },
  buttonText: {
    color: '#rgba(255, 255, 255, 1)'
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
      <NavBar style={styles}>
        <NavButton style={styles.navButton} onPress={()=>{this.handleDrawer(this.props)}}>
          <NavButtonText style={styles.buttonText}>
            <Image style={styles.icon} source={require('../img/ic_menu_white.png')} resizeMode={'contain'}/>
          </NavButtonText>
        </NavButton>
        <NavTitle style={styles.title}>
          {this.props.zhihu.title}
        </NavTitle>
        <NavGroup>
          <NavButton style={styles.navButton}>
            <NavButtonText style={styles.buttonText}>
              <Image style={styles.icon} source={require('../img/ic_message_white.png')} resizeMode={'contain'}/>
            </NavButtonText>
          </NavButton>
          <NavButton style={styles.navButton}>
            <NavButtonText style={styles.buttonText}>
              <Image style={styles.icon} source={require('../img/ic_more_white.png')} resizeMode={'contain'}/>
            </NavButtonText>
          </NavButton>
        </NavGroup>
      </NavBar>
    );
  }

}
