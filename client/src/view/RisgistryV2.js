import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Apis from '../apis'
import SDKBox from './components/SDKBoxV2'
import IBoxButton from './components/Button'
import InputAreaV2 from './components/InputAreaV2'
import { componentController } from '../viewState'
import device from './device'
import Common, { extendStyle } from '../res/styles/common_v2'
import Native from '../apis/native'

export default class RegistryV2 extends Component {

    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return {
            userName: '',
            password: '',
            confirmPassword: ''
        };
    }

    back() {
        componentController.changeView('loginV2')
    }


    fastLogin() {
        componentController.changeView('accountList')
    }

    platformRegistry() {
        const { userName, password, confirmPassword } = this.state;
        if (password === confirmPassword) {
            const params = {
                userName: userName,
                password: password,
                email: '',
                telephone: '',
                exInfo: '',
                isLogin: "0",
                accountType: "0",
                thirdPartyId: '',
                userChannel: "0",
            };
            Apis.login(params).then(msg => {
                console.log(msg)
                if (msg.code === 200) {
                   
                    componentController.changeView('registrySuccess');
                    Native.dispatcherEvent(Native.LOGIN, 200, false, {
                        userId: msg.data.userId,
                        userName: msg.data.userName,
                        token: msg.token
                    });
                }
            }).catch(error => {
                console.log(error)
            });
        }


    }

    render() {
        const { userName, password, confirmPassword } = this.state;
        return (
            <SDKBox title="注册" back={this.back.bind(this)} style={{ height: device.pxTodp(290), flex: 1 }}>
                <View style={extendStyle(Common.margin_20)}>
                    <InputAreaV2 value={userName} onChangeText={text => this.setState({ userName: text })} style={Common.margin_bottom_20} leftIcon={device.getAssertV2('people.png')} placeholder="用户名/电话号" placeholderTextColor="rgb(153,153,153)" />
                    <InputAreaV2 value={password} onChangeText={text => this.setState({ password: text })} style={Common.margin_bottom_20} leftIcon={device.getAssertV2('lock.png')} placeholder="密码" placeholderTextColor="rgb(153,153,153)" secureTextEntry={true} />
                    <InputAreaV2 value={confirmPassword} onChangeText={text => this.setState({ confirmPassword: text })} style={Common.margin_bottom_20} leftIcon={device.getAssertV2('lock.png')} placeholder="请再次输入密码" placeholderTextColor="rgb(153,153,153)" secureTextEntry={true} />
                    <IBoxButton onPress={this.platformRegistry.bind(this)} text="下一步" style={extendStyle(Common.margin_left_20, Common.margin_right_20, { backgroundColor: '#F2CC4A', height: device.pxTodp(30) })} textStyle={{ color: 'white' }} />
                    <View style={extendStyle(Common.margin_left_20, Common.margin_right_20, Common.flex_center, { flexDirection: 'row', height: device.pxTodp(50) })}>
                        <Text style={extendStyle(Common.text_tip, { color: '#666' })}>已有账号</Text>
                        <IBoxButton onPress={this.fastLogin.bind(this)} text="立即登录" style={{ height: device.pxTodp(30) }} textStyle={extendStyle(Common.text_tip, { color: '#56a9f7', fontWeight: '100' })} />
                    </View>
                </View>

            </SDKBox>
        );
    }
}