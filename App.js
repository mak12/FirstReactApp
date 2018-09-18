import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import ToDoList from './src/screens/TodoList/TodoList'
import About from './src/screens/About/About'
import AddTodo from './src/screens/AddTodo/AddTodo'
import Login from './src/screens/Login/Login'
import CheckImage from './src/images/check.png'

const TodoNav = createStackNavigator({
    TodoList: { screen: ToDoList }
})


TodoNav.navigationOptions = {
      title: 'List',
        
     tabBarIcon: ({ tintColor }) => (
      <Image 
        source={ CheckImage} 
        style={[styles.icon, { tintColor }]} 
        
      />
    )
    };


const TabNav = createBottomTabNavigator({
    TodoNav : { screen: TodoNav },
    About: { screen: About }
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

const RootNav = createStackNavigator({
    TabNav: { screen: TabNav,navigationOptions: () => ({
                header: null
    }) },
    AddTodo: { screen: AddTodo }
},{
    mode: 'modal'
})



export default class App extends Component<> {
    state={
    userName: null
}

    login = (userName) =>{
        this.setState({ userName })
    }
    
    logout = () =>{
        AsyncStorage.setItem(
            '@TodoList:userName',''
        ).then(() => 
              this.setState({ userName: null })
              )
    }
    
    render() {
        //Checking if user is null goto Login page else show home page
        if (this.state.userName != null){
            return <RootNav screenProps={{ logout: this.logout }} />
        }
        else{
            return <Login login= { this.login }/>
        }
        
   
  }
}

const styles = StyleSheet.create({
  icon:{
        height: 24,
        resizeMode: 'contain'
    }
});