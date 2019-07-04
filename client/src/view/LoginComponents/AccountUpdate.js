import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Button } from 'react-native';
import InputArea from '../components/InputArea'
import { componentController } from '../../viewState'
import Native from '../../apis/native'
import common from '../../res/styles/common'
import device from '../device'
export default class AccountUpdate extends Component {
    constructor(props) {
        super(props);
    }

    back() {
        componentController.changeView('quickLoginTip');
    }
    onUpdate() {

    }

    onFacebookLogin(){
        Native.facebookLogin((userinfo)=>{
            console.log(userinfo);
        });
    }
    render() {
        const styles = {
            dashLine: { borderColor: 'black', borderStyle: 'dashed', borderWidth: 0.5, flex: 1, height: 0, borderRadius: 1 }
        };
        return <View style={common.contain}>
            <View style={{ flexDirection: "row", margin: 10 }}>
                <TouchableWithoutFeedback onPress={this.back.bind(this)}>
                    <Image style={{ width: 30, height: 30 }} source={require('../../res/img/back.png')} />
                </TouchableWithoutFeedback>
                <View style={{ flex: 1, alignSelf: 'center' }}><Text style={{ textAlign: 'center', color: 'rgb(51, 51, 51)' }}>账号升级</Text></View>
            </View>
            <View style={{ paddingLeft: device.pxTodp(20), paddingRight: device.pxTodp(20), paddingTop: device.pxTodp(5), paddingBottom: device.pxTodp(5) }}>
                <InputArea leftIcon={require('../../res/img/user.png')} textContentType="username" placeholder="请输入您的邮箱账号" placeholderTextColor="rgb(153, 153, 153)" />
            </View>
            <View style={{ paddingLeft: device.pxTodp(20), paddingRight: device.pxTodp(20), paddingTop: device.pxTodp(5), paddingBottom: device.pxTodp(5) }}>
                <InputArea leftIcon={require('../../res/img/password.png')} textContentType="password" secureTextEntry placeholder="请输入您的密码" placeholderTextColor="rgb(153, 153, 153)" />
            </View>
            <View style={{  paddingLeft: device.pxTodp(20), paddingRight: device.pxTodp(20),flexDirection: 'row', height: device.pxTodp(30), alignItems: 'center' }}>
                <View style={styles.dashLine}></View>
                <Text style={{ textAlign: 'center', color: '#8E9090' }}>OR 绑定Facebook</Text>
                <View style={styles.dashLine}></View>
            </View>
            
            <View style={{ paddingLeft: device.pxTodp(20), paddingRight: device.pxTodp(20),alignItems: 'center', justifyContent: 'center' }}>
                <TouchableWithoutFeedback onPress={this.onFacebookLogin.bind(this)}>
                    <Image style={{ width: device.pxTodp(35), height: device.pxTodp(35) }} source={require('../../res/img/facebook.png')} />
                </TouchableWithoutFeedback>
            </View>
            <View style={{ paddingLeft: device.pxTodp(20), paddingRight: device.pxTodp(20), height: device.pxTodp(35), justifyContent: 'center', alignItems: 'stretch' }}>
                <Button color="rgb(203, 53, 54)" onPress={this.onUpdate.bind(this)} title="升级"></Button>
            </View>
        </View>;
    }
}