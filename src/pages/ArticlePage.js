import React, {Component} from 'react';
import {WebView} from 'react-native';
import {Container,Content,View,Grid,Icon,Text,Row} from 'native-base';
import style from '../utils/styles';
import {connect} from 'dva/mobile';
import Loading from '../components/Loading';
import Touch from '../components/Touch';

class ArticlePage extends Component {

  static route = {
    navigationBar: {
      renderRight: (route, prop) => {
        let extra = route.params.extra;
        return (
          <Grid style={styles.navBar}>
            <Touch style={styles.navBtn}>
              <Icon style={styles.navIcon} name="share" ios="md-share"/>
            </Touch>
            <Touch style={styles.navBtn}>
              <Icon style={styles.navIcon} name="star" ios="md-star" active={true}/>
            </Touch>
            <Touch style={styles.navBtn}>
              <Row>
                <Icon style={styles.navIcon} name="text" ios="md-text"/>
                <Text style={styles.navText}>{extra?extra.comments:'...'}</Text>
              </Row>
            </Touch>
            <Touch style={{...styles.navBtn,paddingLeft: 5}}>
              <Row>
                <Icon style={styles.navIcon} name="thumbs-up" ios="md-thumbs-up"/>
                <Text style={styles.navText}>{extra?extra.popularity:'...'}</Text>
              </Row>
            </Touch>
          </Grid>
        )
      }
    }
  };

  constructor(props){
    super(props);
    this.id = props.route.params.id;
  }

  componentDidMount(){
    this.props.dispatch({
      type: 'zhihu/getNews',
      id: this.id
    });
    this.props.dispatch({
      type: 'zhihu/getNewsExtra',
      id: this.id
    })
  }

  componentDidUpdate() {
    let extra = this.props.zhihu.extra[this.id];
    !this.props.route.params.extra && extra && this.props.navigator.updateCurrentRouteParams({extra});
  }

  render() {
    let {zhihu} = this.props;
    let isEmpty = !zhihu.news[this.id];
    let html = '';
    if (!isEmpty) {
      let news = zhihu.news[this.id];
      let body = news.body;
      let darkTheme = '';
      if (zhihu.theme == 'dark')
        darkTheme = "<style>.main-wrap{background-color: #343434} .headline{border-color: #343434} .headline-title{color:#888} .question-title{color: #888} .meta .author{color: #888;} .content{color: #888} .view-more a{background-color: #292929</style>";
      let image = '<div class="img-place-holder" style="overflow: hidden;position: relative"><img src="' + news.image + '" style="margin-top:-80px">'
        + '<div style="position:absolute;bottom:5px;right: 10px;color: white">'
        + news.image_source
        + '</div><div style="position:absolute;bottom:0;color: white;background-color: rgba(0,0,0,0.3);padding: 10px 10px 25px;width: 100%;font-size: 22px;word-break:break-all;">'
        + news.title
        + '</div></div>';
      body = body.replace('<div class="img-place-holder"></div>', image);
      html = '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="'
        + news.css[0]
        + '" />' +
        darkTheme + '</head><body>' + body
        + '</body></html>';
    }
    return (
      isEmpty?<Loading/>:
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <WebView source={{html:html}}/>
        </Content>
      </Container>
    );
  }

}

const styles = {
  ...style
};

export default connect(({zhihu,loading})=>({zhihu,loading:loading.global}))(ArticlePage)