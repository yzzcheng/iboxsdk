import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Button, ScrollView,Alert } from 'react-native';
import InputArea from '../components/InputArea'
import SDKBox from '../components/SDKBox'
import IBoxButton from '../components/Button'
import { componentController } from '../../viewState'
import Native from '../../apis/native'
import Apis from '../../apis'
import device from '../device'
import Common, { extendStyle } from '../../res/styles/common_v2'
import { user } from '../../dao/index'

export default class AccountLogin extends Component {


    constructor(props) {
        super(props);
        this.state = this.initState();

    }

    initState() {
        return {
        };
    }

    close() {
        const { close } = this.props;
        if (close) {
            close();
        }
        Native.hide();
    }

    accountList() {
        componentController.changeView('accountList');
    }

    login() {
        const { accountInfo } = this.props;
        if (accountInfo.accountType == 2) {
            Apis.facebookLogin({
                id: accountInfo.thirdPartyId,
                name: accountInfo.nickName
            }).then(msg => {
                if (msg.code === 200) {
                    Native.dispatcherEvent(Native.LOGIN, 200, false, {
                        userId: msg.data.userId,
                        userName: accountInfo.nickName,
                        token: msg.token
                    });

                } else {
                    Alert.alert(msg.error_msg);
                }
            });

        } else if (accountInfo.accountType == 3) {
            Apis.facebookLogin({
                id: accountInfo.thirdPartyId,
                name: accountInfo.nickName
            }).then(msg => {
                if (msg.code === 200) {
                    Native.dispatcherEvent(Native.LOGIN, 200, false, {
                        userId: msg.data.userId,
                        userName: accountInfo.nickName,
                        token: msg.token
                    });

                } else {
                    Alert.alert(msg.error_msg);
                }
            });
        } else {
            const params = {
                userName: accountInfo.userName,
                password: accountInfo.password,
                email: '',
                telephone: '',
                exInfo: '',
                isLogin: "1",
                accountType: accountInfo.accountType.toString(),
                thirdPartyId: '',
                userChannel: '0',
            };
            Apis.login(params).then(msg => {
                if (msg.code === 200) {
                    Native.dispatcherEvent(Native.LOGIN, 200, false, {
                        userId: msg.data.userId,
                        userName: msg.data.userName,
                        token: msg.token
                    });

                } else {
                    Alert.alert(msg.error_msg);
                }
            }).catch(error => {
                Alert.alert(error);
            });
        }

    }


    renderAccountItem(accountInfo, index) {
        let time = 0;
        if (accountInfo.loginTime) {
            time = parseInt((new Date().getTime() - accountInfo.loginTime.getTime()) / 60000);
        }
        return <View style={{ flexDirection: 'row' }} key={accountInfo.userId} >
            <View style={extendStyle(Common.margin_min, { height: device.pxTodp(25), justifyContent: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: '#54a8f7', borderRadius: device.pxTodp(25), overflow: 'hidden' })}>
                <Image style={{ width: device.pxTodp(25), height: device.pxTodp(25) }} source={device.getAssertV2('people_fill.png')} />
            </View>
            <View style={extendStyle(Common.margin_min, { height: device.pxTodp(30), flexDirection: 'column', justifyContent: 'center', flex: 1 })}>
                <View>
                    <Text style={extendStyle(Common.text_content)}>{accountInfo.nickName}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={extendStyle(Common.margin_right_min, { width: device.pxTodp(12), height: device.pxTodp(12) })} source={device.getAssertV2('time.png')} />
                    <Text style={extendStyle(Common.text_tip)}>上次登录{time}分钟前</Text>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: device.pxTodp(30) }}>
                {index == 0 ? <View style={{ alignItems: 'center', position: 'absolute', width: device.pxTodp(30), height: device.pxTodp(15), top: 0, backgroundColor: '#33cc33' }}><Text style={{ fontSize: device.pxTodp(10) }}>常用</Text></View> : null}
                <View>
                    <TouchableWithoutFeedback onPress={this.accountList.bind(this)}>
                        <Image style={extendStyle({ width: device.pxTodp(14), height: device.pxTodp(14) }, Common.margin_right_min)} source={device.getAssertV2('unfold.png')} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </ View>
    }

    render() {
        const { accountInfo } = this.props;

        return <View style={extendStyle(Common.margin_20, { flex: 1 })}>

            <View style={extendStyle(Common.margin_bottom_20, { height: device.pxTodp(40), flexDirection: 'row' })}>
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                    <Image style={{ width: device.pxTodp(50), height: device.pxTodp(40) }} source={device.getAssertV2('logo.png')} />
                </View>
                <View style={{ alignItems: 'center', width: device.pxTodp(30), justifyContent: 'flex-start' }}>
                    <TouchableWithoutFeedback onPressIn={this.close.bind(this)}>
                        <Image style={{ width: device.pxTodp(20), height: device.pxTodp(20) }} source={device.getAssertV2('close-gray.png')} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={{ borderColor: '#BEC0C0', borderWidth: device.dpTopx(1), borderStyle: 'solid', flexDirection: 'column', height: device.pxTodp(50) }}>
                {this.renderAccountItem(accountInfo, 0)}
            </View>

            <IBoxButton onPress={this.login.bind(this)} text="登录" style={extendStyle(Common.margin_top_20, { backgroundColor: '#F2CC4A', height: device.pxTodp(30) })} textStyle={{ color: 'white' }} />
            <IBoxButton onPress={this.accountList.bind(this)} text="其他账号登录" style={extendStyle(Common.margin_top_20, { height: device.pxTodp(30) })} textStyle={extendStyle(Common.text_tip, { color: '#68696A', fontWeight: '100' })} />

        </View>;
    }
}