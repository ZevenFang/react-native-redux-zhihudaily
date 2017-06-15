import React from 'react';
import {Container, Content, List, ListItem, Thumbnail, Body, Text, Spinner} from 'native-base';
import {connect} from 'dva/mobile';

class AxiosPage extends React.Component {

  static route = {
    navigationBar: {
      title: 'Axios'
    }
  };

  constructor(props) {
    super(props);
    props.dispatch({
      type: 'zhihu/getLatest'
    })
  }

  render() {
    let {zhihu} = this.props;
    console.log(zhihu.data);
    return (
      <Container>
        <Content contentContainerStyle={zhihu.data.length===0?styles.container:{}}>
          {zhihu.data.length===0?<Spinner color="#808080"/>:
            <List>
              {zhihu.data.map((v,k)=>(
                <ListItem key={k}>
                  <Thumbnail square size={80} source={{uri: v.images[0]}} />
                  <Body>
                  <Text>{v.title}</Text>
                  </Body>
                </ListItem>
              ))}
            </List>
          }
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

export default connect(({zhihu})=>({zhihu}))(AxiosPage);