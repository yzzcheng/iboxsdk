import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Button, StyleSheet } from 'react-native';
import InputArea from '../components/InputArea'
import SDKBox from '../components/SDKBoxV2'
import IBoxButton from '../components/Button'
import { componentController } from '../../viewState'
import Native from '../../apis/native'
import device from '../device'
import Common, { extendStyle } from '../../res/styles/common_v2'


const Styles = StyleSheet.create({
    contain: { backgroundColor: '#fff', flex: 1 },
    actions: extendStyle(Common.margin_top_20,{ flexDirection: 'row', justifyContent: 'space-between' }),
    cancalAction: { backgroundColor: '#56a9f7',width:device.pxTodp(95) ,height:device.pxTodp(30)},
    cancalText: { color: '#e4ffff' },
    confirmAction:{backgroundColor:'#f2cc4a',width:device.pxTodp(95) ,height:device.pxTodp(30)}
})

export default class GuestAccountTip extends Component {

    render() {
        return <SDKBox title="游客模式特别说明">
            <View style={Styles.contain}>
                <View style={extendStyle(Common.margin_30)}>
                    <Text style={Common.text_tip}>
                        亲爱的玩家，您正在使用游客模式进行游戏，游客模式下的游戏数据（包含付费数据）会在删除数据、更换设备后清空。为了保障您的虚拟财产安全，以及让您获得更完善的游戏体验，我们建议您使用Facebook登录进行游戏。
                    </Text>
                    <View style={Styles.actions}>
                        <IBoxButton style={Styles.cancalAction} textStyle={Styles.cancalText}>取消</IBoxButton>
                        <IBoxButton style={Styles.confirmAction} textStyle={Styles.cancalText}>确定</IBoxButton>
                    </View>
                </View>

            </View>

        </SDKBox>;
    }
}