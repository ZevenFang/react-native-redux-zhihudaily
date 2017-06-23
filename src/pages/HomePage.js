import React from 'react';
import {RefreshControl} from 'react-native';
import {View, Text, Thumbnail, Container, Content, Body, List, ListItem} from 'native-base';
import Swiper from '../components/Swiper';
import Loading from '../components/Loading';
import {connect} from 'dva/mobile';

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

  _onRefresh = () => {
    this.props.dispatch({
      type: 'zhihu/getLatest'
    })
  };

  render() {
    let {zhihu, loading} = this.props;
    let isEmpty = zhihu.dates.length==0;
    return (
      isEmpty?<Loading/>:
      <Container>
        <Content refreshControl={
          <RefreshControl
            refreshing={!isEmpty && loading}
            onRefresh={this._onRefresh}
            tintColor="lightgrey"
            colors={['#00a2ed', '#a200ed', '#a2ed00']}
            progressBackgroundColor="#fff"
          />
        }>
          <Swiper data={zhihu.topNews} onItemPress={alert}/>
          <List>
            {zhihu.dates.map(d=>(
              zhihu.list[d] && zhihu.list[d].map(v=>(
                <ListItem key={v.id}>
                  <Body><Text>{v.title}</Text></Body>
                  <Thumbnail square size={100} source={{uri: v.images[0]}} />
                </ListItem>
              ))
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = {
  wrapper: {
    height: 200,
  },
  slide1: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
};

export default connect(({zhihu, loading})=>({zhihu, loading: loading.global}))(HomePage);