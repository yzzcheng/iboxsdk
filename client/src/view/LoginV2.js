import React, { Component } from 'react';
import { NativeModules, Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import Apis from '../apis'
import SDKBox from './components/SDKBoxV2'
import IBoxButton from './components/Button'
import InputAreaV2 from './components/InputAreaV2'
import Native from '../apis/native'
import Radio from './components/Radio'
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

    render() {

        return (
            <SDKBox title="平台登录" >
                <View style={extendStyle(Common.margin_20)}>
                    <InputAreaV2 style={Common.margin_bottom_20} leftIcon={device.getAssertV2('people.png')} rightIcon={device.getAssertV2('unfold.png')} placeholder="用户名/电话号" placeholderTextColor="rgb(153,153,153)" />
                    <InputAreaV2 style={Common.margin_bottom_20} leftIcon={device.getAssertV2('lock.png')} placeholder="密码" placeholderTextColor="rgb(153,153,153)" />
                    <IBoxButton text="登录" style={extendStyle(Common.margin_left_20, Common.margin_right_20, { backgroundColor: '#F2CC4A', height: device.pxTodp(30) })} textStyle={{ color: 'white' }} />
                    <View style={extendStyle(Common.margin_left_20, Common.margin_right_20, Common.flex_center, { flexDirection: 'row', height: device.pxTodp(50), justifyContent: 'space-between' })}>
                        <IBoxButton text="忘记密码?" style={{ height: device.pxTodp(30) }} textStyle={extendStyle(Common.text_tip, { color: '#68696A', fontWeight: '100' })} />
                        <IBoxButton text="注册" style={{ height: device.pxTodp(30) }} textStyle={extendStyle(Common.text_tip, { color: '#68696A', fontWeight: '100' })} />
                    </View>
                </View>

            </SDKBox>
        );
    }
}