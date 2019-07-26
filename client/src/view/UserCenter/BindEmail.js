import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Clipboard, Alert, StyleSheet, FlatList } from 'react-native';
import SDKBox from '../components/SDKBoxV2'
import InputArea from '../components/InputAreaV2'
import IBoxButton from '../components/Button'
import IBoxPicker from '../components/Picker'
import device from '../device'
import API from '../../apis'
import { componentController } from '../../viewState'
import Common, { extendStyle } from '../../res/styles/common_v2'
import { user as userStore } from '../../store'


const Styles = StyleSheet.create({
    contain: extendStyle(Common.margin_top_max, { flexDirection: 'column', marginLeft: device.pxTodp(90), marginRight: device.pxTodp(90) }),
    textTip: { color: '#000000' },
    inputStyle: { backgroundColor: '#ffffff' },
    itemStyle: {
        fontSize: 12,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});


export default class BindEmail extends Component {

    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return {
            verifyCode: '',
            email:'',
            visible: false,
            time: -1,
            buttonText:'获取验证码',
            accountInfo: userStore
        }
    }


    onZoneNumOnChange(itemValue) {
        this.setState({
            selectZoneNum: itemValue.key,
            visible: false,
        })
    }

    renderItem({ item }) {
        return <TouchableWithoutFeedback onPress={this.onZoneNumOnChange.bind(this, item)}>
            <View style={Common.margin_bottom_min}>
                <Text style={Styles.itemStyle}>{item.key}</Text>
            </View>
        </TouchableWithoutFeedback>;
    }


    onOpen() {
        if (!this.timer) {
            this.setState({
                visible: true
            });
        }
    }

    onBind() {
        const { verifyCode } = this.state;
        API.verifyResult({verifyCheckCode:verifyCode}).then(msg=>{
            if(msg.code === 200) {
                Alert.alert("","绑定成功",[
                    {text:'确认',onPress:()=>{
                        componentController.changeView('userCenterV2');
                    }}
                ]);
            }
            
        }).catch(error=>{
            Alert.alert(error);
        })
    }


    sendCode() {
        const { email,time } = this.state;
        if (time > 0) return;
        this.setState({
            time: 60
        }, () => {
            
            API.verifyEmail({email:email}).then(msg=>{
                Alert.alert(msg.error_msg);
            }).catch(error=>{
                Alert.alert(error);
            })
            this.timer = setInterval(() => {
                const { time } = this.state;
                console.log(time);
                if (time > 0) {
                    this.setState({
                        time: time - 1,
                        buttonText: (time - 1) + 's'
                    });
                } else {
                    clearInterval(this.timer);
                }

            }, 1000)
        })


    }
    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    back() {
        componentController.changeView('userCenterV2')
    }

    render() {
        const { email, verifyCode, buttonText, accountInfo } = this.state;
        return <SDKBox title="绑定邮箱" back={this.back.bind(this)}>
            <View style={Styles.contain}>
                <Text style={extendStyle(Common.margin_bottom_20, Styles.textTip)}>您正在设置帐号 {accountInfo.nickName} 的密保邮箱，密保邮箱作为解冻、换号等重要手段，无法变更，请谨慎填写</Text>

                <View style={extendStyle(Common.margin_bottom_20, { flexDirection: 'row' })}>
                    <InputArea value={email} onChangeText={text => this.setState({ email: text })} style={extendStyle(Styles.inputStyle, { flex: 1 })} placeholder="请输入邮箱" placeholderTextColor="#757575"></InputArea>
                    <View style={extendStyle(Common.margin_left_20, Common.margin_right_20, Common.flex_center, { flex: 1 })}>
                        <IBoxButton onPress={this.sendCode.bind(this)} style={{ backgroundColor: '#54a8f7', width: device.pxTodp(100), height: device.pxTodp(30) }}>{buttonText}</IBoxButton>
                    </View>
                </View>

                <View style={extendStyle(Common.margin_bottom_20, { flexDirection: 'row' })}>
                    <InputArea value={verifyCode} onChangeText={text => this.setState({ verifyCode: text })} style={extendStyle(Styles.inputStyle, { flex: 1 })} placeholder="请输入验证码" placeholderTextColor="#757575"></InputArea>
                </View>

                <View style={extendStyle(Common.margin_bottom_20, { flexDirection: 'row' })}>
                    <IBoxButton onPress={this.onBind.bind(this)} style={{ backgroundColor: '#f2cc4a', height: device.pxTodp(30), width: device.pxTodp(600), flex: 1 }}>下一步</IBoxButton>
                </View>
            </View>


        </SDKBox>;
    }
}