import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Alert, ScrollView, ToastAndroid } from 'react-native';
import InputArea from '../components/InputArea'
import SDKBox from '../components/SDKBox'
import IBoxButton from '../components/Button'
import { componentController } from '../../viewState'
import Native from '../../apis/native'
import device from '../device'
import Common, { extendStyle } from '../../res/styles/common_v2'
import { user } from '../../dao/index'


export default class EditAccount extends Component {

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

    login() {
        componentController.changeView('loginV2');
    }

    removeAccount(accountInfo) {
        Alert.alert("", "是否确认删除该账号的登录记录", [
            { text: '取消', style: 'cancel' },
            {
                text: '确认', onPress: () => {

                    const { accountList } = this.state;
                    let index = accountList.findIndex(item => item.userId == accountInfo.userId);
                    if (index >= 0) {
                        accountList.splice(index, 1);
                    }
                    user.setAccountList(accountList, (error) => {
                        if (error) {
                            ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
                        } else {
                            this.setState({ accountList });
                        }
                    });

                }, style: 'cancel'
            }
        ], { cancelable: false })

    }


    save() {
        componentController.changeView('accountList');

    }


    renderAccountItem(accountInfo) {
        let time = 0;
        if (accountInfo.loginTime) {
            time = parseInt((new Date().getTime() - accountInfo.loginTime.getTime()) / 60000);
        }
        return <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#BEC0C0', borderStyle: 'solid' }} key={accountInfo.userId}>
            <View style={extendStyle(Common.margin_min, { height: device.pxTodp(25), justifyContent: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: '#54a8f7', borderRadius: device.pxTodp(25), overflow: 'hidden' })}>
                <Image style={{ width: device.pxTodp(25), height: device.pxTodp(25) }} source={device.getAssertV2('people_fill.png')} />
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
                <View>
                    <TouchableWithoutFeedback onPress={this.removeAccount.bind(this, accountInfo)}>
                        <Image style={extendStyle({ width: device.pxTodp(14), height: device.pxTodp(14) }, Common.margin_right_min)} source={device.getAssertV2('delete.png')} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>;
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
            <View style={{ borderColor: '#BEC0C0', borderWidth: 1, borderStyle: 'solid', flexDirection: 'column' }}>
                <ScrollView style={{ height: device.pxTodp(105) }}>
                    {accountList.map(item => this.renderAccountItem(item))}
                </ScrollView>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: device.pxTodp(30) }}>
                    <IBoxButton onPress={this.save.bind(this)} text="完成" style={extendStyle({ height: device.pxTodp(30), flex: 1 })} textStyle={extendStyle(Common.text_tip, { color: '#68696A', fontWeight: '100' })} />
                </View>
            </View>



        </View>;
    }
}