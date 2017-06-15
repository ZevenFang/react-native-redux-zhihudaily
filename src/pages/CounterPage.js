import React, { Component } from 'react';
import { Container, Content, Text, View } from 'native-base';
import Touch from '../components/Touch';
import {connect} from 'dva/mobile';

class CounterPage extends Component {

  static route = {
    navigationBar: {
      title: 'Counter'
    }
  };

  render() {
    let {count, dispatch} = this.props;
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Text>
              Count: { count }
            </Text>
            <Touch onPress={() => { dispatch({ type: 'count/add' }) }}>
              <Text>Add</Text>
            </Touch>
            <Touch onPress={() => { dispatch({ type: 'count/addDelay' }) }}>
              <Text>Delay Add</Text>
            </Touch>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
};

export default connect(({ count }) => ({ count }))(CounterPage);