import React, {Component} from 'react';
import {View,Text,Image,StyleSheet,Dimensions,ListView,StatusBar} from 'react-native';
import Touch from '../utils/Touch';

const styles = StyleSheet.create({
  container:{
    marginTop: 25,
    height:Dimensions.get('window').height-25,
    backgroundColor:'#FAFAFA'
  },
  account:{
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'#00a2ed'
  },
  accountBtn:{
    flexDirection:'row',flex:.5,justifyContent:'center'
  },
  avatar:{
    width:40,
    height:40,
    borderRadius:20,
    overflow:'hidden'
  },
  homeBtn:{
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:30,
    paddingRight:30,
    backgroundColor:'#f0f0f0',
    flexDirection:'row',
    justifyContent:'center'
  },
  itemActive:{
    padding:15,
    flexDirection:'row',
    backgroundColor:'#f0f0f0',
    justifyContent:'center'
  },
  themeItem:{
    padding:15,
    flexDirection:'row',
    justifyContent:'center'
  }
});

export default class SliderBar extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  _renderRow = row => {
    return(
      <Touch onPress={()=>{this.props.fetchArticlesByTheme(row.id);this.props.closeDrawer()}}>
        <View style={styles.themeItem}>
          <View style={{flex:.85}}><Text style={{fontSize:16,color:'black'}}>{row.name}</Text></View>
          <View style={{flex:.15,justifyContent:'center'}}><Image style={{width:13,height:13}} source={require('../img/ic_menu_follow.png')}/></View>
        </View>
      </Touch>
    )
  };

  render() {
    let list = null;
    if (this.props.zhihu.themeList) {
      this.ds = this.ds.cloneWithRows(this.props.zhihu.themeList);
      list = (
        <ListView
          dataSource={this.ds}
          renderRow={this._renderRow}
        />
      )
    }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2986E2"/>
        {/*Account panel*/}
        <View style={styles.account}>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:.2}}>
              <Image style={styles.avatar} source={require('../img/account_avatar.png')}/>
            </View>
            <View style={{flex:.8,justifyContent:'center'}}>
              <Text style={{color:'white',fontSize:16}}>{'请登录'}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',marginTop:20}}>
            <Touch>
              <View style={styles.accountBtn}>
                <View style={{flex:.3}}><Image style={{width:32,height:32}} source={require('../img/ic_favorites_white.png')}/></View>
                <View style={{flex:.7,justifyContent:'center'}}><Text style={{color:'white'}}>我的收藏</Text></View>
              </View>
            </Touch>
            <Touch>
              <View style={styles.accountBtn}>
                <View style={{flex:.3}}><Image style={{width:32,height:32}} source={require('../img/ic_download_white.png')}/></View>
                <View style={{flex:.7,justifyContent:'center'}}><Text style={{color:'white'}}>离线下载</Text></View>
              </View>
            </Touch>
          </View>
        </View>
        {/*Come back to home*/}
        <Touch onPress={()=>{this.props.backToHome();this.props.closeDrawer()}}>
          <View style={styles.homeBtn}>
            <View style={{flex:.15}}><Image style={{width:20,height:20}} source={require('../img/menu_home.png')}/></View>
            <View style={{flex:.85}}><Text style={{color:'#00a2ed',fontSize:16}}>首页</Text></View>
          </View>
        </Touch>
        {/*Theme daily*/}
        {list}
      </View>
    );
  }

}