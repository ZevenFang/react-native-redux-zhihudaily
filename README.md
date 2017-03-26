# react-native-redux-zhihudaily
使用react-native和redux重构的知乎日报，
本项目兼容ios版本，但界面只依照知乎日报Android端编写

## Preview
### Android preview
![Android version](https://raw.github.com/ZevenFang/react-native-redux-zhihudaily/master/screenshot/android.gif)
### IOS preview
![IOS version](https://raw.github.com/ZevenFang/react-native-redux-zhihudaily/master/screenshot/ios.gif)
### Dark theme
![Dark theme](https://raw.github.com/ZevenFang/react-native-redux-zhihudaily/master/screenshot/darkTheme.gif)
### Work with redux
![Redux](https://raw.github.com/ZevenFang/react-native-redux-zhihudaily/master/screenshot/redux.png)

## Getting started
```shell
yarn install # recommend use yarn, also you can use npm install.
yarn run android # enjoy it
yarn run ios # run ios version
```

## Codepush
体验Codepush请下载Release版本，或自己生成release版本：

![Codepush](https://raw.github.com/ZevenFang/react-native-redux-zhihudaily/master/screenshot/zhihurn.png)
```shell
cd android && ./gradlew assembleRelease # 生成已签名apk
cd android && ./gradlew installRelease # 直接安装到设备上
```

## Debug
### 连接开发服务器
参考[ReactNative从设备上访问开发服务器](http://zevenfang.github.io/2016/06/22/ReactNative从设备上访问开发服务器/)
### 连接Redux调试服务器
参考[连接Redux调试服务器](http://zevenfang.github.io/2016/08/21/连接Redux调试服务器/)

## Todos
- [x] 夜间模式
- [ ] 关注主题日报
- [ ] 文章评论列表
- [X] 使用Codepush
