import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, Button } from 'react-native';
import Radio from '../components/Radio'
import { componentController } from '../../viewState'
export default class QuickLoginTip extends Component {
    constructor(props) {
        super(props);
    }
    back() {
        componentController.changeView('login');
    }
    render() {
        return <View>
            <View style={{ flexDirection: "row",margin:10 }}>
                <TouchableWithoutFeedback onPress={this.back.bind(this)}>
                    <Image style={{ width: 30, height: 30 }} source={require('../../res/img/back.png')} />
                </TouchableWithoutFeedback>
                <View style={{ flex: 1, alignSelf: 'center' }}><Text style={{ textAlign: 'center',color:'rgb(51, 51, 51)' }}>快速登录提示</Text></View>
            </View>
            <View style={{ flexDirection: "column",height:100,justifyContent: 'center',padding:10  }}>
                <Text style={{color:'rgb(51, 51, 51)'}}>        玩家朋友，游客模式将无法保障数据安全！删除游戏、更换设备等有可能会清楚游戏数据。</Text>
                <Text style={{color:'rgb(51, 51, 51)'}}>        为了您的虚拟财产安全，强力建议您进行帐号绑定！</Text>
            </View>
            <View style={{ flexDirection: "column",height:50,alignItems: 'center',justifyContent: 'center',padding:10 }}>
                <Radio label="不在提示"/>
            </View>
            <View style={{ flexDirection: "row",height:50,padding:20 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Button color="rgb(203, 53, 54)" title="继续登录"></Button></View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Button color="rgb(0, 114, 190)" title="账号升级"></Button></View>
            </View>
        </View>
    }
}