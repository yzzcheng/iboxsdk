import React, { Component } from 'react';
import { Image,NativeModules,Text, View } from 'react-native';
import InputArea from './components/InputArea'
import IBoxButton from './components/Button'
import device from './device'
import Styles from './styles/Registry'
export default class Risgistry extends Component {

    constructor(props){
        super(props);
        this.state = this.initState();
    }

    initState(){
        return {
           
        };
    }

    render() {
      return (
        <View style={Styles.contain}>
            <View style={Styles.logo}>
                <Image style={Styles.logoImage} source={device.getAssert('login/MG-logo.png')} />
            </View>
            <View style={Styles.loginPannel}>
                <View style={Styles.loginContain}>
                    <View style={Styles.formItem}>
                        <InputArea placeholder="请输入您的账号" placeholderTextColor="#D4D4D4" leftIcon={device.getAssert('platformlogin/user.png')} />
                    </View>
                    <View style={Styles.formItem}>
                        <InputArea placeholder="请输入您的密码" secureTextEntry placeholderTextColor="#D4D4D4" leftIcon={device.getAssert('platformlogin/password.png')} />
                    </View>
                    <View style={Styles.formItem}>
                        <InputArea placeholder="请再次输入您的密码" secureTextEntry placeholderTextColor="#D4D4D4" leftIcon={device.getAssert('platformlogin/password.png')} />
                    </View>
                    <View style={Styles.formItem}>
                        <IBoxButton text="注册" style={Styles.loginBtn} textStyle={Styles.loginBtnText} />
                    </View>
                </View>
            </View>

        </View>
      );
    }
  }