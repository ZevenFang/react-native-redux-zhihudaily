import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,ListView} from 'react-native';
import Touch from '../utils/Touch'
import {Grid,Row,Col} from 'react-native-easy-grid';
import CustomBackTitle from './CustomBackTitle'

export default class Editors extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  _renderRow = row => {
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
                  <Text style={styles.name}>{row.name}</Text>
                </Row>
                <Row>
                  <Text style={styles.bio}>{row.bio}</Text>
                </Row>
              </Col>
            </Grid>
          </View>
        </Touch>
        <View style={styles.line}/>
      </View>
    )
  };

  render() {
    this.ds = this.ds.cloneWithRows(this.props.zhihu.themeDaily.editors);
    return (
      <View style={styles.container}>
        <CustomBackTitle title="主编" left={-270} onNavigate={this.props.onNavigate}/>
        <ListView
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