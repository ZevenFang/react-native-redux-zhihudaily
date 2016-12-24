import React, { Component } from 'react';

import {Platform,BackAndroid} from 'react-native';
import CodePush from 'react-native-code-push';
import Toast from 'react-native-root-toast';
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

  componentDidMount(){
    if (!__DEV__&&Platform.OS==='android'||Platform.OS==='ios')
      this.sync();
  }

  codePushStatusDidChange = (syncStatus) => {
    switch(syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        Toast.show('正在检查更新');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        Toast.show('用户确认更新');
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        Toast.show('等待用户确认');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        // Toast.show('正在更新');
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        Toast.show('已经是最新版本');
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        Toast.show('用户取消更新');
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        Toast.show('安装更新成功，重启应用以完成更新');
        setTimeout(function () {
          BackAndroid.exitApp();
        },2000);
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        Toast.show('未知错误');
        break;
    }
  };

  sync() {
    CodePush.sync(
      {updateDialog: { title: '', optionalUpdateMessage: '知乎日报RN',
        optionalIgnoreButtonLabel: '取消', optionalInstallButtonLabel: '更新',
        appendReleaseDescription: true, descriptionPrefix: "\n\nChange log:\n"}
      },
      this.codePushStatusDidChange
    )
  }

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
