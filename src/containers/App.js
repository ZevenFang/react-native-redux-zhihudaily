import React, { Component } from 'react';

import Root from './Root';
import Home from './Home';
import Counter from './Counter';
import Splash from './Splash';
import Article from './Article';
import ThemeDaily from './ThemeDaily';
import Editors from './Editors';
import Editor from './Editor';

import routeReducer from '../reducers/routes';

import Theme from '../utils/Theme';
import '../utils/Storage';

storage.load({
  key: 'theme'
}).then(ret => { // 使用保存的主题
  global.theme = ret.name;
}).catch(err => { // 如果没有保存的主题，使用默认主题
  global.theme = Theme.LIGHT;
  storage.save({ // 储存默认主题
    key: 'theme',
    rawData: {
      name: Theme.LIGHT
    }
  });
});

export default class App extends Component {
  renderScene = props => {
    switch (props.scene.key) {
      case 'scene_home':
        return <Home onNavigate={props.onNavigate} />;
      case 'scene_counter':
        return <Counter onNavigate={props.onNavigate} />;
      case 'scene_splash':
        return <Splash onNavigate={props.onNavigate} />;
      case 'scene_article':
        return <Article onNavigate={props.onNavigate} />;
      case 'scene_theme_daily':
        return <ThemeDaily onNavigate={props.onNavigate} />;
      case 'scene_editors':
        return <Editors onNavigate={props.onNavigate} />;
      case 'scene_editor':
        return <Editor onNavigate={props.onNavigate} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <Root
        reducer={routeReducer}
        renderScene={this.renderScene}
      />
    );
  }
}
