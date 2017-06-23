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
    props.dispatch({
      type: 'zhihu/getLatest'
    })
  }

  _onEndReached = () => {
    this.props.dispatch({
      type: 'zhihu/getBefore'
    })
  };

  _renderRow = (row, sectionID, rowID) =>{
    let {zhihu} = this.props;
    if (rowID==0)
      return(
        <Swiper data={zhihu.topNews} onItemPress={alert}/>
      );
    return (
      row.date?
        <Separator style={{height: 50}}>
          <Text style={{color: 'grey', fontSize: 15}}>{rowID==1?'今日热闻':row.date}</Text>
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
    let data = [];
    if (!isEmpty){
      zhihu.dates.map(d=> {
        data.push({date: d});
        data = data.concat(zhihu.list[d]);
      })
    }
    return (
      isEmpty?<Loading/>:
      <Container>
        <View>
          <List onEndReachedThreshold={1} refreshControl={
            <RefreshControl
              refreshing={!isEmpty&&loading}
              onRefresh={this._onRefresh}
              tintColor="lightgrey"
              colors={['#00a2ed', '#a200ed', '#a2ed00']}
              progressBackgroundColor={t.background}
            />
          } dataArray={data} renderRow={this._renderRow} onEndReached={!isEmpty&&this._onEndReached}/>
        </View>
      </Container>
    );
  }
}

export default connect(({zhihu, loading})=>({zhihu, loading: loading.global}))(HomePage);