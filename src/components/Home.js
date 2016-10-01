import React, {Component} from 'react';
import HomeNav from './HomeNav'
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Text,
  Image,
  ListView,
  RefreshControl
} from 'react-native';
import SliderBar from './SliderBar'
import DrawerLayout from 'react-native-drawer-layout';
import Swiper from './Swiper';
import {Grid,Col,Row} from 'react-native-easy-grid';
import Touch from '../utils/Touch';
import DateUtil from '../utils/DateUtil';
import Theme from '../utils/Theme';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

/**
 * TODO: 根据时间更新标题
 */

export default class Home extends Component {

  pos = [];
  now = null;

  constructor(props) {
    super(props);
    // props.fetchLatestArticles();
    // props.fetchThemeDailyList();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let now = props.zhihu.latest.date;
    this.now = new Date(now.substring(0,4)+'/'+now.substring(4,6)+'/'+now.substring(6,8));
  }

  closeDrawer = () => {
    this._drawer.closeDrawer();
  };

  openDrawer = () => {
    this._drawer.openDrawer();
  };

  _renderRow = row => {
    let theme = new Theme(this.props.zhihu.theme);
    if (row.subtitle) return <Text style={styles.subtitle}>{row.subtitle}</Text>;
    let multipicShadow = null;
    if (row.multipic) multipicShadow = <View style={{marginTop:60,marginLeft:55,width:30,height:15,backgroundColor:'#000',opacity:0.5,justifyContent:'center'}}><Text style={{color:'white',fontSize:12,textAlign:'center'}}>多图</Text></View>;
    return(
      <Touch onPress={() => {this.props.fetchArticleContentAndExtra(row.id)}}>
        <View style={[styles.article,{backgroundColor:theme.colors.listBg,borderColor:theme.colors.listBorder}]}>
          <Grid>
            <Col size={7}><Text style={{color:theme.colors.listColor,fontSize:18}}>{row.title}</Text></Col>
            <Col size={3} style={{justifyContent:'center'}}>
              <Image style={{left:15,right:10,flex:1,width:85,height:85}} source={{uri:row.images[0]}}>
                {multipicShadow}
              </Image>
            </Col>
          </Grid>
        </View>
      </Touch>
    )
  };

  _onScroll(e,props){ // 动态切换标题
    let y = e.nativeEvent.contentOffset.y;
    let height = e.nativeEvent.layoutMeasurement.height;
    let content = e.nativeEvent.contentSize.height;
    let title = props.zhihu.title;
    // console.warn(e.nativeEvent.contentOffset.y);
    if (y < 240 && title != '首页')
      props.setTitle('首页');
    else if (y >= 240 && title != '今日热闻' && (this.pos.length == 0 || y <= this.pos[0][0])) {
      props.setTitle('今日热闻');
    }
    else if (content == height + y) { // 判断是否下拉到底
      let date = new Date(+this.now-24*60*60*1000 * (this.pos.length+1));
      let dateText = DateUtil.getDateText(date);
      this.pos.push([content,dateText]);
      this.props.fetchArticleBefore(dateText,DateUtil.getBeforeText(date));
    } else {
      for (let i=0;i<this.pos.length;i++){
        if (y > this.pos[i][0] && title != this.pos[i][1] && (this.pos.length == i+1 || y <= this.pos[i+1][0]))
          props.setTitle(this.pos[i][1]);
      }
    }
  }

  render() {

    let {zhihu,refreshArticles} = this.props;
    let theme = new Theme(zhihu.theme);

    //文章列表
    let list = null;
    if (zhihu.latest.stories) {
      this.ds = this.ds.cloneWithRows(JSON.parse(JSON.stringify(zhihu.latest.stories)));
      list = (
        <ListView
          dataSource={this.ds}
          renderRow={this._renderRow}
          style={{marginBottom:6,backgroundColor:theme.colors.background}}
        />
      )
    }

    return (
      <DrawerLayout
        ref={(ref) => this._drawer = ref}
        drawerWidth={300}
        drawerPosition={DrawerLayout.positions.Left}
        renderNavigationView={()=><SliderBar {...this.props} closeDrawer={this.closeDrawer}/>}>
        <HomeNav openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} {...this.props}/>
        <ScrollView
          style={{backgroundColor:theme.colors.background}}
          onScroll = {(e)=>{this._onScroll(e,this.props)}}
          refreshControl={
            <RefreshControl
              refreshing={zhihu.refreshing}
              onRefresh={() => {let now = zhihu.latest.date;this.now = new Date(now.substring(0,4)+'/'+now.substring(4,6)+'/'+now.substring(6,8));this.pos=[];refreshArticles()}}
              tintColor="grey"
              title="Loading..."
              colors={['#00a2ed', '#a200ed', '#a2ed00']}
              progressBackgroundColor="#fff"
            />
          }>
          <Swiper {...this.props}/>
          {list}
        </ScrollView>
        {/*<View style={{position:'absolute',right:5,top:30,height:95,width:195,backgroundColor:'#eee'}}/>*/}
      </DrawerLayout>
    );
  }

}

const styles = StyleSheet.create({
  shadow: {
    opacity:0.5,
    backgroundColor:'#000',
    top:25,
    left:0,
    width,
    height,
    position:'absolute'
  },
  subtitle:{margin:12,color:'grey'},
  article:{
    height:100,
    margin:6,
    marginBottom:0,
    padding:15,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'white',
    borderRadius:5,
    borderColor:'#e3e3e3',
    borderTopWidth:1,
    borderBottomWidth:5,
    flexDirection:'row'
  }
});