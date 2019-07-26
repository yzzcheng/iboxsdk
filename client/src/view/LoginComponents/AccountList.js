import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Button, ScrollView } from 'react-native';
import InputArea from '../components/InputArea'
import SDKBox from '../components/SDKBox'
import IBoxButton from '../components/Button'
import { componentController } from '../../viewState'
import Native from '../../apis/native'
import device from '../device'
import Common, { extendStyle } from '../../res/styles/common_v2'
import { user } from '../../dao/index'

export default class AccountList extends Component {


    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return {
            accountList: []
        };
    }

    close() {
        const { close } = this.props;
        if (close) {
            close();
        }
        Native.hide();
    }

    componentDidMount() {
        user.getAccountList((error, msg) => {
            if (!error) {
                if (msg) {
                    let accountList = JSON.parse(msg);
                    // {"accountType":0,"telephone":"","userType":1,"userName":"linlin.zhang","userId":1}
                    this.setState({
                        accountList: accountList.map(item => {
                            item.loginTime = new Date(item.loginTime);
                            return item;
                        })
                    })
                }

            }
        })
    }

    updateAccount() {
        componentController.changeView('editAccount');
    }

    accountLogin(accountInfo) {
        componentController.changeView('accountLogin', null, {
            accountInfo
        });
    }

    login() {
        componentController.changeView('loginV2');
    }


    renderAccountItem(accountInfo, index) {
        let time = 0;
        console.log(accountInfo)
        if (accountInfo.loginTime) {
            time = parseInt((new Date().getTime() - accountInfo.loginTime.getTime()) / 60000);
        }
        let icon = "people_fill.png";
        if (accountInfo.accountType == 2) icon = "facebook-circle.png";
        else if (accountInfo.accountType == 3) icon = "google.png";

        return <TouchableWithoutFeedback onPress={this.accountLogin.bind(this, accountInfo)} key={accountInfo.userId}>
            <View style={{ flexDirection: 'row', borderBottomWidth: device.dpTopx(1), borderStyle: 'solid', borderColor: '#BEC0C0' }}  >
                <View style={extendStyle(Common.margin_min, { height: device.pxTodp(25), justifyContent: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: '#54a8f7', borderRadius: device.pxTodp(25), overflow: 'hidden' })}>
                    <Image style={{ width: device.pxTodp(25), height: device.pxTodp(25) }} source={device.getAssertV2(icon)} />
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
                    {/* <View>
                        <TouchableWithoutFeedback onPress={this.updateAccount.bind(this)}>
                            <Image style={extendStyle({ width: device.pxTodp(14), height: device.pxTodp(14) }, Common.margin_right_min)} source={device.getAssertV2('unfold.png')} />
                        </TouchableWithoutFeedback>
                    </View> */}
                </View>
            </ View>
        </TouchableWithoutFeedback>
    }

    render() {
        const { accountList } = this.state;
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
            <View style={{ borderColor: '#BEC0C0', borderWidth: device.dpTopx(1), borderStyle: 'solid', flexDirection: 'column', height: device.pxTodp(135) }}>
                <ScrollView>
                    {accountList.map((item, index) => this.renderAccountItem(item, index))}
                </ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: device.pxTodp(30) }}>
                    <IBoxButton onPress={this.login.bind(this)} icon={device.getAssertV2('add.png')} text="添加新账号" style={extendStyle({ height: device.pxTodp(30), flex: 1 })} textStyle={extendStyle(Common.text_tip, { color: '#68696A', fontWeight: '100' })} />
                    <IBoxButton onPress={this.updateAccount.bind(this)} icon={device.getAssertV2('delete-2.png')} text="删除账号" style={extendStyle({ height: device.pxTodp(30), flex: 1 })} textStyle={extendStyle(Common.text_tip, { color: '#68696A', fontWeight: '100' })} />
                </View>
            </View>

            {/* <IBoxButton text="登录" style={extendStyle(Common.margin_top_20, { backgroundColor: '#F2CC4A', height: device.pxTodp(30) })} textStyle={{ color: 'white' }} />
            <IBoxButton text="其他账号登录?" style={extendStyle(Common.margin_top_20, { height: device.pxTodp(30) })} textStyle={extendStyle(Common.text_tip, { color: '#68696A', fontWeight: '100' })} /> */}

        </View>;
    }
}