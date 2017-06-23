import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class MySwiper extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {data, onItemPress} = this.props;
    let slides = [];
    // console.warn(JSON.stringify(topArticles));
    if (data) {
      data.map((v, k) => {
        slides.push(
          <TouchableHighlight key={k} style={styles.slide} onPress={() => onItemPress(v, k)}>
            <Image source={{uri:v.image}} style={styles.slide} resizeMode="cover">
              <View style={styles.shadow}/>
              <Text style={styles.title}>{v.title}</Text>
            </Image>
          </TouchableHighlight>
        )
      });
      return(
        <Swiper style={styles.wrapper}
                dot={<View style={{backgroundColor:'rgba(150,150,150,.5)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                paginationStyle={{bottom:5}}
                height={230}
                autoplay={true}
                loop={false}
                showsPagination={true}
                autoplayTimeout={5}>
          {slides}
        </Swiper>
      )
    }
    return null;
  }

}

const styles = StyleSheet.create({
  wrapper: {
  },
  shadow:{
    backgroundColor:'#333',opacity:0.3,top:170,height:70
  },
  title:{
    top:100,
    marginLeft:20,
    marginRight:20,
    color:'white',
    fontSize:20
  },
  slide: {
    flex:1,
    backgroundColor:'#343434'
  }
});