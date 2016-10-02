import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,ListView} from 'react-native';
import Touch from '../utils/Touch'
import {Grid,Row,Col} from 'react-native-easy-grid';
import CustomBackTitle from './CustomBackTitle'
import Theme from '../utils/Theme'

export default class Editors extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  _renderRow = row => {
    let theme = new Theme(this.props.zhihu.theme);
    return(
      <View>
        <Touch onPress={()=>{this.props.showEditorHome(row.id)}}>
          <View style={styles.item}>
            <Grid>
              <Col size={1}>
                <Image source={{uri:row.avatar}} style={styles.avatar} resizeMode="cover" />
              </Col>
              <Col size={5}>
                <Row>
                  <Text style={[styles.name,{color:theme.colors.listColor}]}>{row.name}</Text>
                </Row>
                <Row>
                  <Text style={[styles.bio,{color:theme.colors.bio}]}>{row.bio}</Text>
                </Row>
              </Col>
            </Grid>
          </View>
        </Touch>
        <View style={[styles.line,{backgroundColor:theme.colors.line}]}/>
      </View>
    )
  };

  render() {
    let theme = new Theme(this.props.zhihu.theme);
    this.ds = this.ds.cloneWithRows(JSON.parse(JSON.stringify(this.props.zhihu.themeDaily.editors)));
    return (
      <View style={styles.container}>
        <CustomBackTitle title="主编" left={-300} {...this.props}/>
        <ListView
          style={{backgroundColor:theme.colors.background}}
          dataSource={this.ds}
          renderRow={this._renderRow}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'white'},
  item:{height:70,padding:12},
  avatar:{height:46,width:46,borderRadius:23},
  name:{color:'black',fontSize:16},
  bio:{color:'grey',fontSize:13,alignSelf:'flex-end'},
  line:{backgroundColor:'#F0F0F0',height:1,width:350,alignSelf:'center'}
});