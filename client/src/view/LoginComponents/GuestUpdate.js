import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Alert, StyleSheet } from 'react-native';
import InputArea from '../components/InputArea'
import SDKBox from '../components/SDKBoxV2'
import API from '../../apis'
import { componentController } from '../../viewState'
import Native from '../../apis/native'
import device from '../device'
import Common, { extendStyle } from '../../res/styles/common_v2'
import user from '../../store/user';


const Styles = StyleSheet.create({
    contain: extendStyle(Common.margin_30, { flex: 1, flexDirection: 'row', backgroundColor: 'white' }),
    guestItem: { flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' },
    accountIcon: { width: device.pxTodp(45), height: device.pxTodp(45) },
    accountText: extendStyle(Common.text_tip, { fontSize: device.pxTodp(12) })
})

export default class GuestUpdate extends Component {

    platformBind() {
        componentController.changeView('platformUpdate');
    }
    facebookBind() {
        Native.facebookLogin(userinfo => {
            console.log(userinfo);
            API.visitorBind({
                userName: "fb-" + userinfo.id,
                email: userinfo.email,
                accountType: 2
            }).then(msg => {
                if (msg.code === 200) {
                    componentController.changeView('userCenterThirdParty');
                } else {
                    Alert.alert(msg.error_msg);
                }

            }).catch(error => {
                Alert.alert(error);
            });
        })
    }
    render() {
        return <SDKBox title="游客升级">
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={Styles.contain}>
                    <TouchableWithoutFeedback onPress={this.facebookBind.bind(this)}>
                        <View style={Styles.guestItem}>
                            <Image style={Styles.accountIcon} source={device.getAssertV2('facebook.png')} />
                            <Text style={Styles.accountText} >Facebook</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.platformBind.bind(this)}>
                        <View style={Styles.guestItem} >
                            <Image style={Styles.accountIcon} source={device.getAssertV2('facebook.png')} />
                            <Text style={Styles.accountText} >平台账号</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </View>
        </SDKBox>;
    }
}