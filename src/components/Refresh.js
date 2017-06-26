import React from 'react';
import {RefreshControl} from 'react-native';
import themes from '../utils/themes';

let t = themes['light'];

class Refresh extends React.Component {

  render() {
    let refresh = {
      tintColor: "lightgrey",
      colors: ['#00a2ed', '#a200ed', '#a2ed00'],
      progressBackgroundColor: t.background,
      ...this.props
    };
    return (
      <RefreshControl {...refresh} />
    )
  }

}

export default Refresh;