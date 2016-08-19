/**
 * MaterialToolbar.js
 * https://github.com/VinceBT/react-native-material-toolbar
 */

import React, { PropTypes } from 'react';
import {
  Text,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

export default React.createClass({
  propTypes: {
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    backgroundImage: PropTypes.string,
    icon: PropTypes.element,
    onIconPress: PropTypes.func,
    title: PropTypes.element,
    actions: PropTypes.array,
    elevation: PropTypes.number,
    statusBar: PropTypes.bool,
    statusBarColor: PropTypes.string,
    rippleColor: PropTypes.string,
  },
  render() {
    const defaultToolbarHeight = 56,
    defaultStatusBarHeight = 25,
    outerContainerStyle = {
      flexDirection: 'column'
    },
    innerContainerStyle = {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: this.props.backgroundColor || 'transparent',
    },
    statusBarStyle = {
      height: defaultStatusBarHeight,
      backgroundColor: this.props.statusBarColor || 'transparent'
    },
    outerBarStyle = {
      height: this.props.height >= 56 && this.props.height || defaultToolbarHeight,
      elevation: this.props.elevation || 0,
      flexDirection: 'column'
    },
    innerBarStyle = {
      height: defaultToolbarHeight,
      flexDirection: 'row',
      overflow: 'hidden'
    },
    iconContainerStyle = {
      height: defaultToolbarHeight,
      width: defaultToolbarHeight,
      alignItems: 'center',
      justifyContent: 'center'
    },
    bodyContainerStyle = {
      flex: 1,
      flexDirection: 'row'
    },
    actionsContainerStyle = {
      flexDirection: 'row'
    },
    actionTextContainerStyle = {

    },
    actionIconContainerStyle = {
      height: defaultToolbarHeight,
      width: defaultToolbarHeight,
      alignItems: 'center',
      justifyContent: 'center'
    };
    let Container = View;
    if (this.props.backgroundImage)
      Container = Image;
    return (
      <Container source={this.props.backgroundImage && {uri: this.props.backgroundImage}} style={outerContainerStyle}>
        <View style={innerContainerStyle}>
          {this.props.statusBar && <View style={statusBarStyle}></View>}
          <View style={outerBarStyle}>
            <View style={innerBarStyle}>
              {this.props.icon &&
                <TouchableNativeFeedback
                  delayPressIn={0}
                  onPress={this.props.onIconPress && (() => this.props.onIconPress())}
                  background={TouchableNativeFeedback.Ripple(this.props.rippleColor || 'rgba(0, 0, 0, .15)', true)}
                >
                  <View style={iconContainerStyle}>
                    {this.props.icon}
                  </View>
                </TouchableNativeFeedback>
              }
              <View style={bodyContainerStyle}>
                {this.props.title}
              </View>
              {this.props.actions && (
                <View style={actionsContainerStyle}>
                  {this.props.actions.map((action, i) => {
                    return (
                      <TouchableNativeFeedback
                        key={i}
                        delayPressIn={0}
                        onPress={action.icon && (() => action.press())}
                        background={TouchableNativeFeedback.Ripple(this.props.rippleColor || 'rgba(0, 0, 0, .15)', true)}
                      >
                        <View style={actionIconContainerStyle}>
                          {action.icon}
                        </View>
                      </TouchableNativeFeedback>
                    );
                  })}
                </View>
                )
              }
            </View>
          </View>
          {this.props.children}
        </View>
      </Container>
    );
  }
});
