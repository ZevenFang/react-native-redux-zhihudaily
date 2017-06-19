import React from 'react';
import {View, Text} from 'native-base';
import {connect} from 'dva/mobile';

class ThemePage extends React.Component {

  static route = {
    navigationBar: {
      title(params) {
        return params.title;
      },
    }
  };

  constructor(props) {
    super(props);
    let id = props.route.params.id;
    props.dispatch({
      type: 'zhihu/getTheme', id
    })
  }

  render() {

    return (
      <Text>{this.props.route.params.id}</Text>
    )
  }

}

export default connect(({zhihu})=>({zhihu}))(ThemePage);