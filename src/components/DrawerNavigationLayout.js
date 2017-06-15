import React from 'react';
import {View, Text} from 'native-base';
import Router from '../Router';
import {
  StackNavigation,
  DrawerNavigation,
  DrawerNavigationItem,
} from '@expo/ex-navigation';

// Treat the DrawerNavigationLayout route like any other route -- you may want to set
// it as the intiial route for a top-level StackNavigation

let defaultRouteConfig={
  navigationBar: {
    backgroundColor: '#808080',
      tintColor: 'white'
  }
};

class DrawerNavigationLayout extends React.Component {
  static route = {
    navigationBar: {
      visible: false
    }
  };

  render() {
    let {menus, initialItem} = this.props;
    return (
      <DrawerNavigation
        id='main'
        initialItem={initialItem}
        drawerWidth={300}
        renderHeader={this._renderHeader}
      >
        {menus.map((v,k)=>(
          <DrawerNavigationItem
            key={k}
            id={v.id}
            selectedStyle={styles.selectedItemStyle}
            renderTitle={isSelected => this._renderTitle(v.title, isSelected)}
          >
            <StackNavigation
              id={v.id}
              defaultRouteConfig={defaultRouteConfig}
              initialRoute={Router.getRoute(v.route||v.id)}
            />
          </DrawerNavigationItem>
        ))}

      </DrawerNavigation>
    );
  }

  _renderHeader = () => {
    return (
      <View style={styles.header}>
      </View>
    );
  };

  _renderTitle(text: string, isSelected: boolean) {
    let style = isSelected ? styles.selectedTitleText : {};
    return (
      <Text style={{...styles.titleText, ...style}}>
        {text}
      </Text>
    );
  };
}

const styles = {
  header: {
    height: 20
  },

  selectedItemStyle: {
    backgroundColor: '#808080'
  },

  titleText: {
    fontWeight: 'bold'
  },

  selectedTitleText: {
    color: 'white'
  }
};

export default DrawerNavigationLayout;