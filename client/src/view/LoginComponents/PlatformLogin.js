import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import InputArea from '../components/InputArea'
import { componentController } from '../../viewState'

export default class PlatformLogin extends Component {
    constructor(props) {
        super(props);
    }

    back() {
        componentController.changeView('login');
    }

   

    render() {
        return <View>
            <View style={{ flexDirection: "row", margin: 10 }}>
                <TouchableWithoutFeedback onPress={this.back.bind(this)}>
                    <Image style={{ width: 30, height: 30 }} source={require('../../res/img/back.png')} />
                </TouchableWithoutFeedback>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'rgb(51, 51, 51)' }}>MG账号登录</Text>
                </View>
            </View>
            <View style={{paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5,height:70}}>
                <InputArea leftIcon={require('../../res/img/user.png')} rightIcon={require('../../res/img/array-down.png')} textContentType="username"   placeholder="请输入您的邮箱账号" placeholderTextColor="rgb(153, 153, 153)"/>
            </View>
            <View style={{paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5,height:70}}>
                <InputArea leftIcon={require('../../res/img/password.png')}  textContentType="password" secureTextEntry  placeholder="请输入您的密码" placeholderTextColor="rgb(153, 153, 153)"/>
            </View>
            <View>
                
            </View>
        </View>
    }
}