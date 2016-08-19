import React, { Component, PropTypes } from 'react';
import { NavigationExperimental,BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';

const { CardStack } = NavigationExperimental;

let exit = false;

@connect(
  state => state,
  dispatch => ({ dispatch })
)
export default class Root extends Component {

  static propTypes = {
    reducer: PropTypes.func.isRequired,
    routes: PropTypes.object.isRequired,
    renderScene: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  handleNavigation = (action) => {
    const { dispatch } = this.props;
    dispatch(action);
  }

  onMainScreen(){
    let routes = this.props.routes.children;
    return routes[routes.length-1].key==='home';
  }

  componentDidMount(){
    BackAndroid.addEventListener('hardwareBackPress', function() {
      if (!this.onMainScreen()) {
        this.handleNavigation({type:'pop'});
        return true;
      }
      if (exit)
        BackAndroid.exitApp();
      exit = true;
      Toast.show('再按一次返回键退出应用');
      setTimeout(function () {
        exit = false;
      },1000);
      return true;
    }.bind(this));
  }

  render() {
    return (
      <CardStack
        direction="horizontal"
        onNavigate={this.handleNavigation}
        navigationState={this.props.routes}
        renderScene={this.props.renderScene}
      />
    );
  }
}
