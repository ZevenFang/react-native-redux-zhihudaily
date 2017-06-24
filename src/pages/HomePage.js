import React from 'react';
import {RefreshControl} from 'react-native';
import {View, Text, Thumbnail, Container, Body, List, ListItem, Separator, Icon} from 'native-base';
import moment from 'moment';
import Swiper from '../components/Swiper';
import Loading from '../components/Loading';
import {connect} from 'dva/mobile';
import themes from '../utils/themes';
import Touch from '../components/Touch';

let t = themes['light'];

class HomePage extends React.Component {

  static route = {
    navigationBar: {
      title: '首页',
      renderRight: (route, prop)=>(
        <Touch style={styles.navBar}>
          <Icon style={styles.navIcon} name="notifications" ios="md-notifications"/>
        </Touch>
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

  _renderRow = (row) =>{
    return (
      row.date?
        <Separator style={{height: 50, backgroundColor: t.background, marginBottom: -6}}>
          <Text style={{color: 'grey', fontSize: 15}}>{row.date}</Text>
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
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navIcon: {
    color: 'white'
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
  }
};

export default connect(({zhihu, loading})=>({zhihu, loading: loading.global}))(HomePage);