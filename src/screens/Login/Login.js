import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Dimensions,
  AsyncStorage
} from 'react-native'

import { 
  Container, 
  Content, 
  Form, 
  Item, 
  Input,
  Button,
  Text
} from 'native-base'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import LoginImage from 'images/todo_icon.png'


export default class Login extends Component{
    
    state={
        userName: '',
        password: '',
        width: 0,
        usernameLoaded: false
    }

    componentDidMount(){
        console.log("Component did mount from:")
        AsyncStorage.getItem(
            '@TodoList:userName'
        ).then(userName => {
            console.log("user name from:", userName)
            if(!userName || userName===""){
                this.setState({ usernameLoaded: true })
            }
            else{
                this.props.login(userName)   
            }
//            this.setState({ userName })
        }).catch(e =>{
            this.setState({ usernameLoaded: true})
        })
    }

//    componentWillMount(){
//        console.log("Component will mount from:")
//    }

    login = () =>{
        console.log("User name:",this.state.userName)
        AsyncStorage.setItem(
            '@TodoList:userName',
            this.state.userName    
        ).then(() => { console.log("Data saved")
                     this.props.login(this.state.userName)
                     })
        
    }
    
    render(){
            if(!this.state.usernameLoaded){
                return <View />
            }
        return(
            <KeyboardAwareScrollView 
            keyboardShouldPersistTaps= 'always'
            style= {{ flex:1 }}  
            >
             <Container>
              <View 
                style= {styles.logoContainer}
                onLayout={event =>{
                this.setState({ width:event.nativeEvent.layout.width })
                console.warn("Event", event.nativeEvent.layout)
            }}
                >          
                <Image 
                    source= { LoginImage }
                    resizeMode= 'contain'
                    style= {{
                    width: this.state.width / 2.0,
                    height: this.state.width / 2.0,
                    maxHeight: 200,
                    maxWidth: 200
            }}/>
             </View>
                <View style={{ padding: 20 }}>
                    <Item style={{ marginRight: 5 }}>
                        <Input 
                        placeholder="Username" 
                        value= {this.state.userName} 
                        onChangeText= {text => {this.setState({ userName: text })}} />
                    </Item>
                    <Item style={{ marginRight: 5 }}>
                        <Input 
                        placeholder="Password" 
                        value={this.state.password}
                        secureTextEntry
                        onChangeText={text => {
                        this.setState({ password: text })}} />
                    </Item>
                    <Button 
                    block 
                    style={{ marginTop: 80 }}
                    onPress={ this.login } >
                    <Text>Login</Text>
                    </Button>
                </View>
            </Container>
          </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
    }
})