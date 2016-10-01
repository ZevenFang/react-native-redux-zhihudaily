import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import {Grid,Row,Col} from 'react-native-easy-grid';
import CustomBackTitle from './CustomBackTitle'
import Http from '../utils/Http'

export default class Editor extends Component {

  render() {
    let id = this.props.zhihu.editorId;
    let uri = Http.HOST+'editor/'+id+'/profile-page/'+Platform.OS;
    return (
      <View style={{flex:1}}>
        <CustomBackTitle title="主编资料" left={-225} {...this.props}/>
        <WebView source={{uri}}/>
      </View>
    );
  }

}