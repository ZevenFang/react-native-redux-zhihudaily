import React from 'react';
import {RefreshControl} from 'react-native';
import {View, Text, Thumbnail, Container, Content, Body, List, ListItem, Separator} from 'native-base';
import Swiper from '../components/Swiper';
import Loading from '../components/Loading';
import {connect} from 'dva/mobile';
import themes from '../utils/themes';

let t = themes['light'];

class HomePage extends React.Component {

  static route = {
    navigationBar: {
      title: '首页'
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

  _renderRow = (row, sectionID, rowID) =>{
    return (
      row.date?
        <Separator style={{height: 50}}>
          <Text style={{color: 'grey', fontSize: 15}}>{row.date}</Text>
        </Separator>:
        <ListItem key={row.id}>
          <Body><Text>{row.title}</Text></Body>
          <Thumbnail square size={100} source={{uri: row.images[0]}} />
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
        data.push({date: i==0?'今日热闻':d});
        data = data.concat(zhihu.list[d]);
      })
    }
    return (
      isEmpty?<Loading/>:
      <Container>
        <View>
          <List dataArray={data} renderRow={this._renderRow}
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

export default connect(({zhihu, loading})=>({zhihu, loading: loading.global}))(HomePage);