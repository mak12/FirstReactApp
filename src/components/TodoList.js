import React, {Component} from 'react';
import { StyleSheet, 
        Text, 
        View,
        FlatList,
        StatusBar,
        ActivityIndicator,
        Image,
        Platform
       } from 'react-native';

import { Button, Text as NBText, Segment } from 'native-base'

import TodoItems from './TodoItem'

import CheckImage from '../images/check.png'

import { items } from '../lib/api.js'

export default class TodoList extends Component{
    
    static navigationOptions = {

            header: null
         }


    state = {
        items: null,
        filter: 'All'
    }

//   componentDidMount(){
//        setTimeout(() => {
//            const taskFromNetwork = ["First", "Second", "Third"]                
//            this.setState({
//                items: taskFromNetwork
//            })
//        }, 2000)
//    }  // just a delay method


componentDidMount(){
            items('GET')
            .then( items => {
                this.setState({ items })
                console.log("Items :",items)
            
        }).catch((error)=>{
     console.log("Api call error");
            alert(error.message);
     
  });
    }

    addItem = () => {
        this.props.navigation.navigate(
            'AddTodo', {
                saveItem: this.saveItem
            })
  }

    saveItem = (newTask) => {
            items('POST', { task: newTask })
            .then( json => {
                this.setState({ items: json })
                //console.log("Items :",items)
            
        }).catch((error)=>{
     console.log("Api call error");
            alert(error.message);
     
  });
    }
    
    updateTodo = (id, completed) =>{
            items('PUT', { id, completed })
            .then( json => {
                this.setState({ items: json })
                //console.log("Items :",items)
            
        }).catch((error)=>{
     console.log("Api call error");
            alert(error.message);
     
  });
    }
    
    deleteTodo = (id) =>{
            items('DELETE', { id })
            .then( json => {
                this.setState({ items: json })
                //console.log("Items :",items)
            
        }).catch((error)=>{
     console.log("Api call error");
            alert(error.message);
     
  });
    }
    
    filterdItems = () =>{
        if(this.state.filter === 'Todo'){
            return this.state.items.filter( i =>{
                return !i.completed
            })
        }
        if(this.state.filter === 'Completed'){
            return this.state.items.filter( i =>{
                return i.completed
            })
        }
        return this.state.items
    }
    
    render(){
//     console.log("Log");
//     console.warn("Warning in console");
//     console.error("Error in console")

        const thirdTask = "Bring it back"
        return(
            <View style={styles.container}>
            <StatusBar barStyle="light-content" />
                <View style= {styles.header}>
                    <Text style={styles.headerItem}>
                        Todo List
                    </Text>
                </View>
             <View style= {styles.contentWrapper}>
            
                <View style= {styles.contentHeader}>
                    <Segment style={{ alignSelf: "stretch"}}>
                        <Button first 
                        active={this.state.filter === 'All'} 
                        onPress={() =>this.setState({filter :'All'})}>
                            <NBText style={{ alignItems: 'center', justifyContent: 'center'}}>All</NBText>
                        </Button>
                         <Button 
                            active={this.state.filter === 'Todo'} 
                            onPress={() =>this.setState({filter :'Todo'})}>
                            <NBText>Todo</NBText>
                        </Button>
                         <Button last 
                         active={this.state.filter === 'Completed'} 
                         onPress={() =>this.setState({filter :'Completed'})}>
                            <NBText>Complete</NBText>
                        </Button>
                      </Segment>
                </View>
                
                {
                    !this.state.items && <ActivityIndicator
                        size= "large"
                        color= "#2288ee"
                        style= {{ marginTop: 20 }}
                        />        
            
                    }
            
                <FlatList
                    data = {this.filterdItems()}
                    style = {styles.content}
                    renderItem = {(row) => {
                        return <TodoItems 
                            item = {row.item}
                            updateTodo = {this.updateTodo}
                            deleteTodo = {this.deleteTodo}
                        />
                }}
                keyExtractor = {item => item.id.toString()}
                    />
                
                <View style= {styles.contentFooter}>
                    <Button onPress={this.addItem}>
                        <NBText 
                            style ={
                                Platform.select({
                                    ios: { minWidth: 100 },
                                    android: { width:200, textAlign: 'center' }
                            })
                            }
                            >Add Item</NBText>
                    </Button>
                </View>
        
             </View>
            </View>
            );
    }
}

const styles = StyleSheet.create({
    
 container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    padding : 10,
    paddingTop: 20,
    alignSelf: 'stretch',
    backgroundColor:'#2288ee',
    borderBottomWidth: 1,
    borderColor: '#0066cc'
  },
    headerItem :{
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffff'
  },
    content: {
        flex : 1,
        alignSelf: 'stretch'
    },
    contentWrapper: {
        flex: 1
    },
    contentHeader: {
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#aaa',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'stretch'
    },
    contentFooter: {
        padding: 20,
        justifyContent: 'flex-end',
        flexDirection: 'row'    
    },
    icon:{
        height: 24,
        resizeMode: 'contain'
    }
});