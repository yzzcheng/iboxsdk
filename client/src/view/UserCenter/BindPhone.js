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


export default class BindPhone extends Component {

    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return {
            selectZoneNum: '87',
            visible: false,
            time: -1,
            phoneNum: '',
            buttonText: '获取验证码',
            verifyCode: ''
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

    onClose() {
        this.setState({
            visible: false
        });
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

        const { time,phoneNum } = this.state;
        if (time > 0) return;
        this.setState({
            time: 60
        }, () => {

            API.verifyPhone({phone:phoneNum}).then(msg=>{
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
        const { selectZoneNum, visible, time, phoneNum, verifyCode, buttonText } = this.state;
        console.log(visible);
        return <SDKBox title="绑定手机" back={this.back.bind(this)}>
            <View style={Styles.contain}>
                <Text style={extendStyle(Common.margin_bottom_20, Styles.textTip)}>请输入手机号进行绑定</Text>
                <View style={extendStyle(Common.margin_bottom_20, { flexDirection: 'row' })}>
                    <IBoxPicker onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)} style={extendStyle(Styles.inputStyle, { borderColor: '#cdcdcd', borderWidth: device.dpTopx(1), borderStyle: 'solid', width: device.pxTodp(50) })} lable={selectZoneNum} visible={visible} >
                        <View style={Common.margin_30}>
                            <FlatList
                                data={[{ key: '+86' }, { key: '+87' }]}
                                renderItem={this.renderItem.bind(this)}
                            />
                        </View>

                    </IBoxPicker>
                    <InputArea value={phoneNum} onChangeText={text => this.setState({ phoneNum: text })} style={extendStyle(Styles.inputStyle, { flex: 1 })} placeholder="请输入电话号" placeholderTextColor="#757575"></InputArea>
                </View>
                <View style={extendStyle(Common.margin_bottom_20, { flexDirection: 'row' })}>
                    <InputArea value={verifyCode} onChangeText={text => this.setState({ verifyCode: text })} style={extendStyle(Styles.inputStyle, { width: device.pxTodp(290) })} placeholder="请输入验证码" placeholderTextColor="#757575"></InputArea>
                    <View style={extendStyle(Common.margin_left_20, Common.margin_right_20, Common.flex_center, { flex: 1 })}>
                        <IBoxButton onPress={this.sendCode.bind(this)} style={{ backgroundColor: '#54a8f7', width: device.pxTodp(100), height: device.pxTodp(30) }}>{buttonText}</IBoxButton>
                    </View>
                </View>
                <View style={extendStyle(Common.margin_bottom_20, { flexDirection: 'row' })}>
                    <IBoxButton onPress={this.onBind.bind(this)} style={{ backgroundColor: '#f2cc4a', height: device.pxTodp(30), flex: 1 }}>下一步</IBoxButton>
                </View>
            </View>


        </SDKBox>;
    }
}