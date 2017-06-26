import React from 'react';
import {RefreshControl} from 'react-native';
import {View, Text, Thumbnail, Container, Body, List, ListItem, Separator, Icon, Grid} from 'native-base';
import moment from 'moment';
import Swiper from '../components/Swiper';
import Loading from '../components/Loading';
import {connect} from 'dva/mobile';
import themes from '../utils/themes';
import Touch from '../components/Touch';

let t = themes['light'];

class HomePage extends React.Component {

  pos = {};

  static route = {
    navigationBar: {
      title({title}){
        return title||'首页';
      },
      renderRight: (route, prop)=>(
        <Grid style={styles.navBar}>
          <Touch style={styles.navBtn}>
            <Icon style={styles.navIcon} name="notifications" ios="md-notifications"/>
          </Touch>
          <Touch style={styles.navBtn}>
            <Icon style={styles.navIcon} name="more" ios="md-more"/>
          </Touch>
        </Grid>
      )
    }
  };

  constructor(props){
    super(props);
    this._onRefresh();
  }

  _onRefresh = () => {
    this.props.dispatch({
      type: 'zhihu/getLatest'
    })
  };

  _onEndReached = () => {
    this.props.dispatch({
      type: 'zhihu/getBefore'
    })
  };

  _onItemLayout = (e, date) => {
    this.pos[date] = e.nativeEvent.layout.y;
  };

  _onScroll = (e) => {
    let y = e.nativeEvent.contentOffset.y;
    let dates = Object.keys(this.pos);
    let title = '首页';
    for (let i=0; i<dates.length; i++) {
      let date = dates[i];
      if (y >= this.pos[date])
        title = date;
      else break;
    }
    if (this.props.route.params.title !== title)
      this.props.navigator.updateCurrentRouteParams({title})
  };

  _renderRow = row =>{
    return (
      row.date?
        <Separator style={styles.separator} onLayout={e=>this._onItemLayout(e, row.date)}>
          <Text style={styles.separatorText}>{row.date}</Text>
        </Separator>:
        <ListItem style={styles.listItem} onPress={alert}>
          <Body><Text>{row.title}</Text></Body>
          <Thumbnail square source={{uri: row.images[0]}} style={{marginLeft: 15}} />
        </ListItem>
    )
  };

  render() {
    let {zhihu, loading} = this.props;
    let isEmpty = zhihu.dates.length==0;
    let refresh = {
      refreshing: !isEmpty&&loading,
      onRefresh: this._onRefresh,
      tintColor: "lightgrey",
      colors: ['#00a2ed', '#a200ed', '#a2ed00'],
      progressBackgroundColor: t.background
    };
    let data = [];
    if (!isEmpty){
      zhihu.dates.map((d,i)=> {
        data.push({date: i==0?'今日热闻':moment(d,'YYYYMMDD').format('MoDo dddd')});
        data = data.concat(zhihu.list[d]);
      })
    }
    return (
      isEmpty?<Loading/>:
      <Container>
        <View style={{backgroundColor: t.background}}>
          <List style={{backgroundColor: t.listBg}}
                dataArray={data} renderRow={this._renderRow}
                removeClippedSubviews={false}
                onScroll={this._onScroll}
                onEndReachedThreshold={1}
                onEndReached={!isEmpty&&this._onEndReached}
                renderHeader={()=>(<Swiper data={zhihu.topNews} onItemPress={alert}/>)}
                refreshControl={<RefreshControl {...refresh} />} />
        </View>
      </Container>
    );
  }
}

let styles = {
  navBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navBtn: {
    padding: 15
  },
  navIcon: {
    color: 'white',
    fontSize: 25
  },
  listItem: {
    marginLeft: 0,
    borderLeftColor: t.background,
    borderTopColor: t.background,
    borderRightColor: t.background,
    borderLeftWidth: 8,
    borderTopWidth: 6,
    borderRightWidth: 8,
    borderBottomWidth: 2
  },
  separator: {
    height: 50,
    backgroundColor:
    t.background,
    marginBottom: -6
  },
  separatorText: {
    color: 'grey',
    fontSize: 14
  }
};

export default connect(({zhihu, loading})=>({zhihu, loading: loading.global}))(HomePage);