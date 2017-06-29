import React from 'react';
import {Platform} from 'react-native';
import {Container, Content, Spinner} from 'native-base';
import themes from '../utils/themes';

let t = themes['light'];

class Loading extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {color} = this.props;
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Spinner color={color||(Platform.OS==='ios'?'lightgrey':t.titleBar)}/>
        </Content>
      </Container>
    )
  }

}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
};

export default Loading;