import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import ToDoList from './src/components/TodoList'
import About from './src/components/About'
import AddTodo from './src/components/AddTodo'
import CheckImage from './src/images/check.png'

const TodoNav = createStackNavigator({
    TodoList: { screen: ToDoList },
    AddTodo: { screen: AddTodo }
}, {
  mode: 'modal'   
})


TodoNav.navigationOptions = {
      title: 'List',
      header: null,
     tabBarIcon: ({ tintColor }) => (
      <Image 
        source={ CheckImage} 
        style={[styles.icon, { tintColor }]} 
        
      />
    )
    };


const TabNav = createBottomTabNavigator({
    LOL: { screen: TodoNav },
    AboutNav: { screen: About }
}, {
   
    tabBarOptions: {
        activeTintColor: '#0066cc',
        showLabel: true,
        showIcon : true
//         labelStyle: {
//            fontSize: 13
//  }
    }
    
    
})

export default class App extends Component<> {
  render() {
    return (
//      <ToDoList />
        //using tab nav now
        <TabNav />
    );
  }
}

const styles = StyleSheet.create({
  icon:{
        height: 24,
        resizeMode: 'contain'
    }
});