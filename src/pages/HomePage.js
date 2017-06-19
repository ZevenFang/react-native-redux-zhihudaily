import React from 'react';
import {View, Text, Thumbnail} from 'native-base';

class HomePage extends React.Component {

  static route = {
    navigationBar: {
      title: '首页'
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{marginTop: 20}}>Click on the upper left corner to navigate.</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default HomePage;