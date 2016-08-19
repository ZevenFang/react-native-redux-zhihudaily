import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Dimensions} from 'react-native';
import ArticleNav from './ArticleNav'

export default class Article extends Component {

  render() {
    let {zhihu} = this.props;
    let body = zhihu.article.body;
    let image = '<div class="img-place-holder" style="overflow: hidden;position: relative"><img src="'+zhihu.article.image+'" style="margin-top:-80px">'
      +'<div style="position:absolute;bottom:5px;right: 10px;color: white">'
      +zhihu.article.image_source
      +'</div><div style="position:absolute;bottom:0;color: white;background-color: rgba(0,0,0,0.3);padding: 10px 10px 25px;width: 100%;font-size: 22px;word-break:break-all;">'
      +zhihu.article.title
      +'</div></div>';
    body = body.replace('<div class="img-place-holder"></div>',image);
    let html = '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="'
      + zhihu.article.css[0]
      + '" /></head><body>' + body
      + '</body></html>';
    return (
      <View style={{flex:1}}>
        <ArticleNav {...this.props}/>
        {/*
         <Image
         resizeMode="cover"
         source={{uri: zhihu.article.image}}
         style={styles.headerImage} >
         <Text style={{color:'white',right:10,bottom:5,position:'absolute'}}>{zhihu.article.image_source}</Text>
         <View style={styles.titleContainer}>
         <Text style={styles.title}>
         {zhihu.article.title}
         </Text>
         </View>
         </Image>
         */}
        <WebView
          style={styles.content} source={{html:html}}/>
      </View>

    );
  }

}

const HEADER_SIZE = 215;
const styles = StyleSheet.create({
  headerImage: {
    height: HEADER_SIZE,
    flexDirection: 'row',
    backgroundColor: '#DDDDDD'
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '300',
    color: 'white'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top:0
  }
});