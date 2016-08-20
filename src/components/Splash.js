import React, {Component} from 'react';
import {Image,StyleSheet,Dimensions,View,Animated,Text,StatusBar} from 'react-native';

export default class Splash extends Component {

  bounceValue = new Animated.Value(1);
  WINDOW_WIDTH = Dimensions.get('window').width;
  WINDOW_HEIGHT = Dimensions.get('window').height;

  constructor(props) {
    super(props);
    props.fetchSplash();
    props.fetchLatestArticles();
    props.fetchThemeDailyList();
  }

  toHome = () => {
    const { onNavigate } = this.props;
    onNavigate({
      type: 'push',
      key: 'home'
    });
  };

  componentDidMount() {
    this.bounceValue.setValue(1);
    Animated.timing(
      this.bounceValue,
      {
        toValue: 1.2,
        duration: 5000
      }
    ).start();
  };

  render() {
    const { splash } = this.props.zhihu;
    // img = require('image!splash');
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#333"/>
        <Animated.Image
          source={splash.img}
          style={{
            backgroundColor:'#333',
            flex: 1,
            width: this.WINDOW_WIDTH,
            height: this.WINDOW_HEIGHT,
            transform: [
              {scale: this.bounceValue}
            ]
          }} />
        <Text style={styles.text}>
          {splash.text}
        </Text>
        <Image style={styles.logo} source={require('../img/splash_logo.png')}/>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  cover: {
    flex: 1,
    width: 200,
    height: 1
  },
  logo: {
    resizeMode: 'contain',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
    height: 54,
    backgroundColor: 'transparent'
  },
  text: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
    backgroundColor: 'transparent'
  }
});