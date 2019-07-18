import React, { Component } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import Apis from '../../apis'
import IBoxButton from '../components/Button'
import Native from '../../apis/native'
import { componentController } from '../../viewState'
import device from '../device'
import Common, { extendStyle } from '../../res/styles/common_v2'


const Styles = StyleSheet.create({
    contain: { backgroundColor: '#fff', flex: 1 },
    actions: extendStyle(Common.margin_top_20,{ flexDirection: 'row', justifyContent: 'space-between' }),
    cancalAction: { backgroundColor: '#ffffff',width:device.pxTodp(95) ,height:device.pxTodp(30)},
    cancalText: { color: '#56a9f7' },
    confirmAction:{backgroundColor:'#56a9f7',width:device.pxTodp(95) ,height:device.pxTodp(30)},
    confirmText: { color: '#ffffff' },
})


export default class RegistrySuccess extends Component {

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
                <View style={Styles.contain}>
                    <View style={extendStyle(Common.margin_30)}>
                        <Text style={Common.text_tip}>
                        您的帐号29123***123信息尚未完善，请尽快补充完整以保证帐号的安全。
                    </Text>
                        <View style={Styles.actions}>
                            <IBoxButton style={Styles.cancalAction} textStyle={Styles.cancalText}>下次再说</IBoxButton>
                            <IBoxButton style={Styles.confirmAction} textStyle={Styles.confirmText}>立即设置</IBoxButton>
                        </View>
                    </View>

                </View>
        );
    }
}