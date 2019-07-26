import React, { Component } from 'react';
import { NativeModules, Text, View, TouchableWithoutFeedback, ToastAndroid } from 'react-native';
import Apis from '../apis'
import SDKBox from './components/SDKBoxV2'
import IBoxButton from './components/Button'
import InputAreaV2 from './components/InputAreaV2'
import Native from '../apis/native'
import { componentController } from '../viewState'
import device from './device'
import Common, { extendStyle } from '../res/styles/common_v2'

export default class LoginV2 extends Component {

    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return {
            userName: '',
            password: ''
        };
    }

    registry() {
        componentController.changeView('registryV2')
    }

    forgetPassword() {
        componentController.changeView('modifyPassword')
    }

    changeAccount() {
        componentController.changeView('accountList')
    }

    platformLogin() {
        const { userName, password } = this.state;
        const params = {
            userName: userName,
            password: password,
            email: '',
            telephone: '',
            exInfo: '',
            isLogin: "1",
            accountType: "0",
            thirdPartyId: '',
            userChannel: "0",
        };
        Apis.login(params).then(msg => {
            if (msg.code === 200) {

                Native.dispatcherEvent(Native.LOGIN, 200, false, {
                    userId: msg.data.userId,
                    userName: msg.data.userName,
                    token: msg.token
                });

            }
        }).catch(error => {
            ToastAndroid.showWithGravity(error,ToastAndroid.SHORT,ToastAndroid.CENTER);
            console.log(error)
        });
    }

    render() {
        const { userName, password } = this.state;
        return (
            <SDKBox title="平台登录" >
                <View style={extendStyle(Common.margin_20)}>
                    <InputAreaV2 value={userName} onChangeText={text => this.setState({ userName: text })} onRightClick={this.changeAccount.bind(this)} style={Common.margin_bottom_20} leftIcon={device.getAssertV2('people.png')} rightIcon={device.getAssertV2('unfold.png')} placeholder="用户名/电话号" placeholderTextColor="rgb(153,153,153)" />
                    <InputAreaV2 value={password} onChangeText={text => this.setState({ password: text })} style={Common.margin_bottom_20} leftIcon={device.getAssertV2('lock.png')} placeholder="密码" placeholderTextColor="rgb(153,153,153)" secureTextEntry={true} />
                    <IBoxButton onPress={this.platformLogin.bind(this)} text="登录" style={extendStyle({ backgroundColor: '#F2CC4A', height: device.pxTodp(30) })} textStyle={{ color: 'white' }} />
                    <View style={extendStyle(Common.margin_left_20, Common.margin_right_20, Common.flex_center, { flexDirection: 'row', height: device.pxTodp(50), justifyContent: 'space-between' })}>
                        <IBoxButton onPress={this.forgetPassword.bind(this)} text="忘记密码?" style={{ height: device.pxTodp(30) }} textStyle={extendStyle(Common.text_tip, { color: '#68696A', fontWeight: '100' })} />
                        <IBoxButton onPress={this.registry.bind(this)} text="注册" style={{ height: device.pxTodp(30) }} textStyle={extendStyle(Common.text_tip, { color: '#68696A', fontWeight: '100' })} />
                    </View>
                </View>

            </SDKBox>
        );
    }
}