import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Button, StyleSheet } from 'react-native';
import InputArea from '../components/InputArea'
import SDKBox from '../components/SDKBoxV2'
import IBoxButton from '../components/Button'
import { componentController } from '../../viewState'
import Native from '../../apis/native'
import device from '../device'
import Common, { extendStyle } from '../../res/styles/common_v2'
import Apis from '../../apis'
import { user } from '../../dao/index'
const Styles = StyleSheet.create({
    contain: { backgroundColor: '#fff', flex: 1 },
    actions: extendStyle(Common.margin_top_20, { flexDirection: 'row', justifyContent: 'space-between' }),
    cancalAction: { backgroundColor: '#56a9f7', width: device.pxTodp(95), height: device.pxTodp(30) },
    cancalText: { color: '#e4ffff' },
    confirmAction: { backgroundColor: '#f2cc4a', width: device.pxTodp(95), height: device.pxTodp(30) }
})

export default class GuestAccountTip extends Component {


    close() {
        Native.hide();
    }

    back() {
        Native.hide();
    }


    guestLogin() {

        user.getAccountList((error, msg) => {

            if (msg) {
                let accountList = JSON.parse(msg);
                console.log(accountList)
                let guestAccount = accountList.find(item => item.userType == 0);

                const params = {
                    userName: '',
                    password: Math.random().toString(36).substr(2),
                    email: '',
                    telephone: '',
                    exInfo: '',
                    isLogin: "1",
                    accountType: "0",
                    thirdPartyId: '',
                    userChannel: "0",
                };

                if (guestAccount) {
                    params.userName = guestAccount.userName;
                    params.password = guestAccount.password;
                } else {
                    params.isLogin = "0";
                }
                Apis.login(params).then(msg => {
                    if (msg.code === 200) {

                        Native.dispatcherEvent(Native.LOGIN, 200, false, {
                            userId: msg.data.userId,
                            userName: msg.data.userName,
                            token: msg.token
                        });

                    }
                }).catch(error => {
                    console.log(error)
                });
            } else {
                const params = {
                    userName: '',
                    password: Math.random().toString(36).substr(2),
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
                    console.log(error)
                });
            }

        })

    }

    render() {
        return <SDKBox title="游客模式特别说明" close={this.close.bind(this)} back={this.back.bind(this)}>
            <View style={Styles.contain}>
                <View style={extendStyle(Common.margin_30)}>
                    <Text style={Common.text_tip}>
                        亲爱的玩家，您正在使用游客模式进行游戏，游客模式下的游戏数据（包含付费数据）会在删除数据、更换设备后清空。为了保障您的虚拟财产安全，以及让您获得更完善的游戏体验，我们建议您使用Facebook登录进行游戏。
                    </Text>
                    <View style={Styles.actions}>
                        <IBoxButton onPress={this.close.bind(this)} style={Styles.cancalAction} textStyle={Styles.cancalText}>取消</IBoxButton>
                        <IBoxButton onPress={this.guestLogin.bind(this)} style={Styles.confirmAction} textStyle={Styles.cancalText}>确定</IBoxButton>
                    </View>
                </View>

            </View>

        </SDKBox>;
    }
}