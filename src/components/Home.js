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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

/**
 * TODO: 根据时间更新标题
 */

export default class Home extends Component {

  pos = [];
  now = {};

  constructor(props) {
    super(props);
    // props.fetchLatestArticles();
    // props.fetchThemeDailyList();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let now = props.zhihu.latest.date;
    this.now = new Date(now.substring(0,4)+'/'+now.substring(4,6)+'/'+now.substring(6,8));
  }

  closeDrawer = () => {
    this._drawer.closeDrawer()
  };

  openDrawer = () => {
    this._drawer.openDrawer();
  };

  _renderRow = row => {
    let multipicShadow = null;
    if (row.multipic) multipicShadow = <View style={{marginTop:60,marginLeft:55,width:30,height:15,backgroundColor:'#000',opacity:0.5,justifyContent:'center'}}><Text style={{color:'white',fontSize:12,textAlign:'center'}}>多图</Text></View>;
    return(
      <Touch onPress={() => {this.props.fetchArticleContentAndExtra(row.id)}}>
        <View style={styles.article}>
          <Grid>
            <Col size={7}><Text style={{color:'black',fontSize:18}}>{row.title}</Text></Col>
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

  _onScroll(e,props){
    let y = e.nativeEvent.contentOffset.y;
    let title = props.zhihu.title;
    // console.warn(e.nativeEvent.contentOffset.y);
    if (y<240&&title!='首页')
      props.setTitle('首页');
    else if (y>=240&&title!='今日热闻')
      props.setTitle('今日热闻');
    if (y+518==props.zhihu.contentSize) {
      props.fetchArticleBefore();
      console.warn('scrollToBottom');
    }
  }

  render() {
    let {zhihu,refreshArticles} = this.props;

    //文章列表
    let list = null;
    if (zhihu.latest.stories) {
      this.ds = this.ds.cloneWithRows(zhihu.latest.stories);
      list = (
        <ListView
          dataSource={this.ds}
          renderRow={this._renderRow}
          style={{marginBottom:6}}
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
        onScroll = {(e)=>{this._onScroll(e,this.props)}}
        refreshControl={
            <RefreshControl
              refreshing={zhihu.refreshing}
              onRefresh={refreshArticles}
              tintColor="grey"
              title="Loading..."
              colors={['#00a2ed', '#a200ed', '#a2ed00']}
              progressBackgroundColor="#fff"
            />
          }>
        <Swiper {...this.props}/>
        <Text style={styles.subtitle}>今日热闻</Text>
        {list}
      </ScrollView>
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
    borderWidth:1,
    borderBottomWidth:5,
    flexDirection:'row'
  }
});