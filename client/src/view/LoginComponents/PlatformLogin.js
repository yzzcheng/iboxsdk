import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Button } from 'react-native';
import InputArea from '../components/InputArea'
import IBoxButton from '../components/Button'
import device from '../device'
import { componentController } from '../../viewState'
import Styles from './styles/PlatformLogin'


export default class PlatformLogin extends Component {
    constructor(props) {
        super(props);
    }

    back() {
        componentController.changeView('login');
    }

    onPlatformLogin() {
        componentController.changeView('loginLoading');
    }

    accountUpdate() {
        componentController.changeView('accountUpdate');
    }

    registry() {
        componentController.changeView('registry');
    }

    render() {
        return <View style={Styles.contain}>
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
                        <IBoxButton text="登录游戏" style={Styles.loginBtn} textStyle={Styles.loginBtnText} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            <IBoxButton text="切换登录方式" onPress={this.back.bind(this)} style={Styles.otherBtn} textStyle={Styles.otherBtnText} />
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <IBoxButton text="注册正式账号" onPress={this.registry.bind(this)} style={Styles.regPlatformBtn} textStyle={Styles.regPlatformBtnText} />
                        </View>

                    </View>
                </View>
            </View>

        </View>
    }
}