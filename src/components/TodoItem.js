import React, {Component} from 'react';
import {Alert} from 'react-native';
import {ListItem, CheckBox, Text, Icon, Right} from 'native-base';

class TodoItem extends Component {

  render() {
    let {index, completed, text, onPress, onDelete} = this.props;
    return (
      <ListItem onPress={() => onPress(index)} onLongPress={()=>{}}>
        <CheckBox style={{backgroundColor: completed?'gray':'white', borderColor: 'gray'}} checked={completed} />
        <Text style={{marginLeft: 15, textDecorationLine: completed?'line-through':'none'}}>{text}</Text>
        <Right>
          <Icon name="close" style={{color: '#808080'}} onPress={()=> Alert.alert(
            'Delete',
            'Are you sure?',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'OK', onPress: () => onDelete(index)}
            ]
          )}/>
        </Right>
      </ListItem>
    );
  }

}

export default TodoItem;