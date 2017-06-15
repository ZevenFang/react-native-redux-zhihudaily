import React from 'react';
import {Container, Content, Text, Icon, Header, Input, Item, View} from 'native-base';
import {connect} from 'dva/mobile';
import {TabNavigation, TabNavigationItem as TabItem} from '@expo/ex-navigation';
import TodoItem from '../components/TodoItem';
import Touch from '../components/Touch';

class TodosPage extends React.Component {

  static route = {
    navigationBar: {
      title: 'Todos',
      renderRight: ()=>(
        <View style={styles.headerRight}>
          <ClearButton/>
        </View>
      )
    }
  };

  render() {
    return (
      <TabNavigation
        id="main"
        navigatorUID="main"
        initialTab="all">
        <TabItem
          id="all"
          selectedStyle={styles.selectedTab}
          renderIcon={(isSelected) => <Icon name="list" style={{color: isSelected?"white":"gray"}} /> }>
          <TodosList {...this.props} type="all" />
        </TabItem>
        <TabItem
          id="active"
          selectedStyle={styles.selectedTab}
          renderIcon={(isSelected) => <Icon name="time" style={{color: isSelected?"white":"lightblue"}} /> }>
          <TodosList {...this.props} type="active" />
        </TabItem>
        <TabItem
          id="completed"
          selectedStyle={styles.selectedTab}
          renderIcon={(isSelected) => <Icon name="checkmark-circle" style={{color: isSelected?"white":"lightgreen"}} /> }>
          <TodosList {...this.props} type="completed" />
        </TabItem>
      </TabNavigation>
    )
  }

}

class TodosList extends React.Component {

  state = {
    text: ''
  };

  addTask = () => {
    let {dispatch} = this.props;
    let {text} = this.state;
    if (text.trim().length===0) return;
    dispatch({
      type: 'todos/add',
      text
    });
    this.setState({text: ''});
  };

  delTask = (index) => {
    let {dispatch} = this.props;
    dispatch({
      type: 'todos/del',
      index
    });
  };
  
  check = (index) => {
    let {dispatch} = this.props;
    dispatch({
      type: 'todos/check',
      index
    })
  };
  
  render() {
    let {todos, type} = this.props;
    let list = todos.list.map((v,k) => ({...v, index: k}));
    if (type=='active') list = list.filter(v => !v.completed);
    else if (type=='completed') list = list.filter(v => v.completed);
    return (
      <Container>
        <Header style={{backgroundColor: '#808080'}} searchBar rounded>
          <Item>
            <Icon name="reorder" />
            <Input placeholder="New task"
                   onSubmitEditing={this.addTask}
                   onChangeText={(text) => this.setState({text})}
                   value={this.state.text}/>
            <Icon name="checkmark" onPress={this.addTask} />
          </Item>
        </Header>
        <Content>
          {list.length>0?list.map((v,k)=>(
            <TodoItem key={k} index={v.index} text={v.text} completed={v.completed} onPress={this.check} onDelete={this.delTask}/>
          )):<View style={{alignItems: 'center', marginTop: 20}}><Text style={{color: '#808080'}}>There is no task here.</Text></View>}
        </Content>
      </Container>
    )
  }

}

@connect()
class ClearButton extends React.Component {
  render() {
    return (
      <Touch onPress={()=>{this.props.dispatch({type: 'todos/clearCompleted'})}}>
        <Text style={{color: 'white'}}>Clear completed</Text>
      </Touch>
    )
  }
}

const styles = {
  selectedTab: {
    backgroundColor: '#AAA'
  },
  headerRight: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 15
  }
};

export default connect(({todos})=>({todos}))(TodosPage);