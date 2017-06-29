import React from 'react';
import {Image} from 'react-native';
import {View, Text, Container, Content, List, ListItem, Thumbnail, Body, Grid, Icon} from 'native-base';
import {connect} from 'dva/mobile';
import Loading from '../components/Loading';
import Refresh from '../components/Refresh';
import themes from '../utils/themes';
import style from '../utils/styles';
import Router from '../Router';
import Touch from '../components/Touch';

let t = themes['light'];

class ThemePage extends React.Component {

  static route = {
    navigationBar: {
      title(params) {
        return params.title;
      },
      renderRight: (route, prop)=>(
        <Grid style={styles.navBar}>
          <Touch style={styles.navBtn}>
            <Icon style={styles.navIcon} name="add-circle" android="ios-add-circle-outline" />
          </Touch>
        </Grid>
      )
    }
  };

  constructor(props) {
    super(props);
    this.id = props.route.params.id;
  }

  componentDidMount() {
    this._onRefresh();
  }

  _onRefresh = () =>{
    this.props.dispatch({
      type: 'zhihu/getTheme', id: this.id
    })
  };

  _renderRow = row =>{
    return (
      <ListItem style={{...styles.listItem, height: 100}} onPress={()=>this.getNews(row.id)}>
        <Body><Text>{row.title}</Text></Body>
        {row.images&&<Thumbnail square source={{uri: row.images[0]}} style={{marginLeft: 15}} />}
      </ListItem>
    )
  };

  getNews = (id) => {
    this.props.navigator.push(Router.getRoute('article', {id}));
  };

  render() {
    let {zhihu, loading} = this.props;
    let theme = zhihu.themes[this.id];
    let isEmpty = !theme;
    return (
      isEmpty?<Loading/>:
        <Container>
          <Content refreshControl={<Refresh refreshing={!isEmpty&&loading} onRefresh={this._onRefresh}/>}>
            <View style={styles.slide}>
              <Image source={{uri:theme.image}} style={styles.slide} resizeMode="cover">
                <Text style={styles.title}>{theme.description}</Text>
              </Image>
            </View>
            <View style={{backgroundColor: t.background}}>
              <List style={{backgroundColor: t.listBg}}
                    dataArray={theme.stories} renderRow={this._renderRow}/>
            </View>
          </Content>
        </Container>
    )
  }
}

const styles = {
  ...style,
  title:{
    top:140,
    marginLeft:20,
    marginRight:20,
    color:'white',
    fontSize:20
  },
  slide: {
    flex: 1,
    height: 220,
    backgroundColor:'#343434'
  }
};

export default connect(({zhihu, loading})=>({zhihu, loading: loading.global}))(ThemePage);