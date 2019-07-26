import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Clipboard, Alert, StyleSheet, FlatList } from 'react-native';
import SDKBox from '../components/SDKBoxV2'
import InputArea from '../components/InputAreaV2'
import IBoxButton from '../components/Button'
import { user as userStore } from '../../store'
import device from '../device'
import API from '../../apis'
import { componentController } from '../../viewState'
import Common, { extendStyle } from '../../res/styles/common_v2'



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


export default class ModifyPassword extends Component {

    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return {
            visible: false,
            time: -1,
            buttonText: '获取验证码',
            verifyCode: '',
            password: '',
            confirmPassword: ''
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

    onBind() {
        const { verifyCode, password, confirmPassword } = this.state;
        if (password == confirmPassword) {
            API.modifyPassword({ verifyCheckCode: verifyCode, password: password }).then(msg => {
                if (msg.code === 200) {
                    Alert.alert("", "修改密码成功", [
                        {
                            text: '确认', onPress: () => {
                                componentController.changeView('userCenterV2');
                            }
                        }
                    ]);
                }

            }).catch(error => {
                Alert.alert(error);
            })
        }

    }


    sendCode() {
        const { time } = this.state;
        if (time > 0) return;
        this.setState({
            time: 60
        }, () => {

            API.verifyPhone({ phone: userStore.telephone }).then(msg => {
                Alert.alert(msg.error_msg);
            }).catch(error => {
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
                    this.setState({
                        buttonText: '重新发送'
                    })
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
        const { visible, verifyCode, buttonText, password, confirmPassword } = this.state;
        console.log(visible);
        return <SDKBox title="修改密码" back={this.back.bind(this)}>
            <View style={Styles.contain}>
                <Text style={extendStyle(Common.margin_bottom_20, Styles.textTip)}>请输入已绑定手机号的验证码</Text>
                <View style={extendStyle(Common.margin_bottom_20, { flexDirection: 'row' })}>
                    <InputArea  value={verifyCode} onChangeText={text => this.setState({ verifyCode: text })} style={extendStyle(Styles.inputStyle, { flex: 1 })} placeholder="请输入验证码" placeholderTextColor="#757575"></InputArea>
                    <View style={extendStyle(Common.margin_left_20, Common.margin_right_20, Common.flex_center, { flex: 1 })}>
                        <IBoxButton onPress={this.sendCode.bind(this)} style={{ backgroundColor: '#54a8f7', width: device.pxTodp(100), height: device.pxTodp(30) }}>{buttonText}</IBoxButton>
                    </View>
                </View>
                <Text style={extendStyle(Common.margin_bottom_20, Styles.textTip)}>设置新密码</Text>
                <View style={extendStyle(Common.margin_bottom_20, { flexDirection: 'row' })}>
                    <InputArea secureTextEntry={true} value={password} onChangeText={text => this.setState({ password: text })} style={extendStyle(Styles.inputStyle, { flex: 1 })} placeholder="请输入新密码" placeholderTextColor="#757575"></InputArea>
                </View>
                <View style={extendStyle(Common.margin_bottom_20, { flexDirection: 'row' })}>
                    <InputArea secureTextEntry={true} value={confirmPassword} onChangeText={text => this.setState({ confirmPassword: text })} style={extendStyle(Styles.inputStyle, { flex: 1 })} placeholder="请在此输入新密码" placeholderTextColor="#757575"></InputArea>
                </View>
                <View style={extendStyle(Common.margin_bottom_20, { flexDirection: 'row' })}>
                    <IBoxButton onPress={this.onBind.bind(this)} style={{ backgroundColor: '#f2cc4a', height: device.pxTodp(30), flex: 1 }}>下一步</IBoxButton>
                </View>
            </View>


        </SDKBox>;
    }
}