import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Clipboard, Alert, StyleSheet } from 'react-native';
import SDKBox from '../components/SDKBoxV2'
import IBoxButton from '../components/Button'
import device from '../device'
import API from '../../apis'
import { componentController } from '../../viewState'
import Common, { extendStyle } from '../../res/styles/common_v2'
import {user as userStore} from '../../store' 


const Styles = StyleSheet.create({
    actionItem: { width: device.pxTodp(200), height: device.pxTodp(60), borderWidth: device.dpTopx(1), borderStyle: 'solid', borderColor: '#f2f2f2', backgroundColor: '#ffffff', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    actionIcon: { width: device.pxTodp(30), height: device.pxTodp(30) },
    actionText: { color: '#333333', fontSize: device.pxTodp(12) },
    warning: extendStyle(Common.margin_left_20,Common.margin_right_20,{ backgroundColor: 'red', flexDirection: 'row', height: 30, alignItems: 'center' }),
    warningIcon: { width: device.pxTodp(18), height: device.pxTodp(18) },
    warningText: { fontSize: device.pxTodp(12), color: 'white' }
});


export default class UserCenterV2 extends Component {

    constructor(props){
        super(props);
        this.state = this.initState();
    }

    initState(){
        return {
            accountInfo:userStore
        };
    }

    componentDidMount(){
        this.setState({
           accountInfo:userStore
        })
    }
    changeAccount() {
        componentController.changeView('loginV2');
    }

    changeView(view) {
        componentController.changeView(view);
    }


    render() {
        const {accountInfo} = this.state;
        const icon = accountInfo.accountType == 2 ?'facebook-circle.png':'google.png';
        return <SDKBox title="用户中心">
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', height: device.pxTodp(60), alignItems: 'center', backgroundColor: '#ffffff' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={extendStyle(Common.margin_min, { height: device.pxTodp(40), justifyContent: 'center', borderWidth: device.dpTopx(1), borderStyle: 'solid', borderColor: '#54a8f7', borderRadius: device.pxTodp(25), overflow: 'hidden' })}>
                            <Image style={{ width: device.pxTodp(40), height: device.pxTodp(40) }} source={device.getAssertV2(icon)} />
                        </View>
                        <Text style={extendStyle(Common.text_tip, { color: '#000000' })}>{accountInfo.nickName}</Text>
                    </View>
                    <View><IBoxButton onPress={this.changeAccount.bind(this)} style={extendStyle(Common.margin_right_min, { borderWidth: device.dpTopx(1), borderStyle: 'solid', borderColor: '#ff3300', width: device.pxTodp(80), height: device.pxTodp(30) })} textStyle={extendStyle(Common.text_tip, { color: '#ff3300' })}>切换账号</IBoxButton></View>
                </View>
                <View style={extendStyle(Common.margin_top_20, { flex: 1 })}>
                    <View style={{ marginLeft: device.pxTodp(100), marginRight: device.pxTodp(100), flexWrap: 'wrap', flexDirection: 'row' }}>
                        <TouchableWithoutFeedback onPress={this.changeView.bind(this, 'modifyPassword')}>
                            <View style={Styles.actionItem}>
                                <Image style={Styles.actionIcon} source={device.getAssertV2('community_fill.png')} />
                                <Text style={Styles.actionText}>冻结申诉</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.changeView.bind(this, 'modifyPassword')}>

                            <View style={Styles.actionItem}>
                                <Image style={Styles.actionIcon} source={device.getAssertV2('question_fill.png')} />
                                <Text style={Styles.actionText}>用户帮助</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        </SDKBox>;
    }
}