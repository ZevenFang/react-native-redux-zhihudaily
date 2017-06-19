import React from 'react';
import {StatusBar, Platform} from 'react-native';
import {View, Text, Thumbnail, Grid, Row, Col, Icon} from 'native-base';
import Router from '../Router';
import {
  StackNavigation,
  DrawerNavigation,
  DrawerNavigationItem,
} from '@expo/ex-navigation';
import themes from '../utils/themes';
import {connect} from 'dva/mobile';

// Treat the DrawerNavigationLayout route like any other route -- you may want to set
// it as the intiial route for a top-level StackNavigation

let t = themes['light'];
let defaultRouteConfig={
  navigationBar: {
    backgroundColor: t.titleBar,
    tintColor: 'white'
  }
};

class DrawerNavigationLayout extends React.Component {
  static route = {
    navigationBar: {
      visible: false
    }
  };

  constructor(props){
    super(props);
    props.dispatch({
      type: 'zhihu/getThemes'
    })
  }

  render() {
    let {initialItem, zhihu} = this.props;
    let menus = zhihu.themesList.map(v=>({id: 'counter', title: v.name}));
    menus.unshift({id: 'home', title: '首页'});
    return (
      <DrawerNavigation
        id='main'
        initialItem={initialItem}
        drawerWidth={300}
        renderHeader={this._renderHeader}
      >
        {menus.map((v,k)=>(
          <DrawerNavigationItem
            key={k}
            id={v.id}
            selectedStyle={styles.selectedItemStyle}
            renderTitle={isSelected => this._renderTitle(v.id, v.title, isSelected)}
          >
            <StackNavigation
              id={v.id}
              defaultRouteConfig={defaultRouteConfig}
              initialRoute={Router.getRoute(v.route||v.id)}
            />
          </DrawerNavigationItem>
        ))}

      </DrawerNavigation>
    );
  }

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <StatusBar barStyle="light-content" backgroundColor={t.statusBar}/>
        {Platform.OS=='android'&&<View style={{height: 20, backgroundColor: t.statusBar}}/>}
        <Grid>
          <Row style={styles.vertical}>
            <Thumbnail style={{marginLeft: 15}} small source={require('../assets/img/account_avatar.png')}/>
            <Text style={{...styles.white, marginLeft: 15}}>请登录</Text>
          </Row>
          <Row style={{marginTop: 25, paddingBottom: 10}}>
            <Col>
              <Row style={styles.center}>
                <Icon name="star" style={styles.icon} ios="md-star" />
                <Text style={styles.white}>我的收藏</Text>
              </Row>
            </Col>
            <Col>
              <Row style={styles.center}>
                <Icon name="download" style={styles.icon} ios="md-download" />
                <Text style={styles.white}>离线下载</Text>
              </Row>
            </Col>
          </Row>
        </Grid>
      </View>
    );
  };

  _renderTitle(id: string, text: string, isSelected: boolean) {
    let style = isSelected ? styles.selectedItemStyle : {};
    if (id=='home') {
      return (
        <Row style={{...style, ...styles.vertical}}>
          <Icon name="home" ios="md-home" style={{fontSize: 20, color: t.homeBtnText, marginLeft: 5, marginRight: 10}} />
          <Text style={{color: t.homeBtnText}}>首页</Text>
        </Row>
      )
    }
    return (
      <Row>
        <Col>
          <Text style={{...style, padding: 5}}>
            {text}
          </Text>
        </Col>
        <Col style={{alignItems: 'flex-end'}}>
          <Icon name="add" ios="md-add" style={{fontSize: 20, marginRight: 30, color: 'lightgrey'}} />
        </Col>
      </Row>
    );
  };
}

const styles = {
  header: {
    paddingTop: Platform.OS=='ios'?30:10,
    height: Platform.OS=='ios'?120:100,
    backgroundColor: t.account
  },

  white: {
    color: 'white'
  },

  vertical: {
    alignItems: 'center'
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  icon: {
    marginRight: 20,
    color: 'white',
    fontSize: 16
  },

  selectedItemStyle: {
    backgroundColor: t.background
  }

};

export default connect(({zhihu})=>({zhihu}))(DrawerNavigationLayout);