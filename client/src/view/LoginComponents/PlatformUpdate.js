import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Apis from '../../apis'
import SDKBox from '../components/SDKBoxV2'
import IBoxButton from '../components/Button'
import InputAreaV2 from '../components/InputAreaV2'
import Native from '../../apis/native'
import Radio from '../components/Radio'
import { componentController } from '../../viewState'
import device from '../device'
import Common, { extendStyle } from '../../res/styles/common_v2'

export default class PlatformUpdate extends Component {

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
            <SDKBox title="升级平台账号" style={{height: device.pxTodp(290),flex:1}}>
                <View style={extendStyle(Common.margin_20)}>
                    <InputAreaV2 style={Common.margin_bottom_20} leftIcon={device.getAssertV2('people.png')} rightIcon={device.getAssertV2('unfold.png')} placeholder="用户名/电话号" placeholderTextColor="rgb(153,153,153)" />
                    <InputAreaV2 style={Common.margin_bottom_20} leftIcon={device.getAssertV2('lock.png')} placeholder="密码" placeholderTextColor="rgb(153,153,153)" />
                    <InputAreaV2 style={Common.margin_bottom_20} leftIcon={device.getAssertV2('lock.png')} placeholder="请再次输入密码" placeholderTextColor="rgb(153,153,153)" />
                    <IBoxButton text="下一步" style={extendStyle(Common.margin_left_20, Common.margin_right_20, { backgroundColor: '#F2CC4A', height: device.pxTodp(30) })} textStyle={{ color: 'white' }} />
                </View>

            </SDKBox>
        );
    }
}