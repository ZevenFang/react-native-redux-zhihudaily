import React from 'react';
import {Container, Content, Spinner} from 'native-base';

class Loading extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {color} = this.props;
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Spinner color={color||'#808080'}/>
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