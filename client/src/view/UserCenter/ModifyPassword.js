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
            selectZoneNum: '87',
            visible: false,
            time: 60,
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


    onOpen(){
        if(!this.timer) {
            this.setState({
                visible:true
            });
        }
    }

    onBind(){
        Alert.alert('绑定手机号码成功')
    }


    sendCode() {
        this.setState({
            time: 60
        }, () => {
            this.timer = setInterval(() => {
                const { time } = this.state;
                console.log(time);
                if (time > 0) {
                    this.setState({
                        time: time - 1
                    });
                } else {
                    clearInterval(this.timer);
                }

            }, 1000)
        })


    }
    componentWillUnmount(){
        if(this.timer) {
            clearInterval(this.timer);
        }
    }
    back(){
        componentController.changeView('userCenterV2')
    }

    render() {
        const { selectZoneNum, visible, time } = this.state;
        console.log(visible);
        return <SDKBox title="修改密码" back={this.back.bind(this)}>
            <View style={Styles.contain}>
                <Text style={extendStyle(Common.margin_bottom_20, Styles.textTip)}>请输入已绑定手机号的验证码</Text>
                <View style={extendStyle(Common.margin_bottom_20, { flexDirection: 'row' })}>
                    <InputArea style={extendStyle(Styles.inputStyle, { flex:1 })} placeholder="请输入电话号" placeholderTextColor="#757575"></InputArea>
                </View>
                <View style={extendStyle(Common.margin_bottom_20, { flexDirection: 'row' })}>
                    <InputArea style={extendStyle(Styles.inputStyle, { flex:1 })} placeholder="请输入验证码" placeholderTextColor="#757575"></InputArea>
                    <View style={extendStyle(Common.margin_left_20, Common.margin_right_20, Common.flex_center)}>
                        <Text style={{ color: '#999999' }}>({time}s)</Text>
                    </View>
                    <View style={extendStyle(Common.margin_left_20, Common.margin_right_20, Common.flex_center)}>
                        <IBoxButton onPress={this.sendCode.bind(this)} textStyle={{ color: '#ff3300' }}>重新发送</IBoxButton>
                    </View>
                    <View style={extendStyle(Common.margin_left_20, Common.margin_right_20, Common.flex_center)}>
                        <IBoxButton style={{ backgroundColor: '#54a8f7', width: device.pxTodp(100) }}>获取验证码</IBoxButton>
                    </View>
                </View>
                <Text style={extendStyle(Common.margin_bottom_20, Styles.textTip)}>设置新密码</Text>
                <View style={extendStyle(Common.margin_bottom_20, { flexDirection: 'row' })}>
                    <InputArea style={extendStyle(Styles.inputStyle, { flex:1 })} placeholder="请输入新密码" placeholderTextColor="#757575"></InputArea>
                </View>
                <View style={extendStyle(Common.margin_bottom_20, { flexDirection: 'row' })}>
                    <InputArea style={extendStyle(Styles.inputStyle, { flex:1})} placeholder="请在此输入新密码" placeholderTextColor="#757575"></InputArea>
                </View>
                <View style={extendStyle(Common.margin_bottom_20, { flexDirection: 'row' })}>
                    <IBoxButton onPress={this.onBind.bind(this)} style={{ backgroundColor: '#f2cc4a', height: device.pxTodp(30),flex:1 }}>下一步</IBoxButton>
                </View>
            </View>


        </SDKBox>;
    }
}