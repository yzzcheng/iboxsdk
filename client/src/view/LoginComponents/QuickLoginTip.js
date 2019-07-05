import React, { Component } from 'react';
import { View, Text} from 'react-native';
import Radio from '../components/Radio'
import common from '../../res/styles/common'
import { componentController } from '../../viewState'
import SDKBox from '../components/SDKBox'
import device from '../device'
import IBoxButton from '../components/Button'

export default class QuickLoginTip extends Component {
    constructor(props) {
        super(props);
    }
    back() {
        componentController.changeView('login');
    }

    continue() {
        componentController.changeView('loginLoading');
    }

    accountupdate() {
        componentController.changeView('accountUpdate');
    }


    render() {
        return <SDKBox style={{ height: device.pxTodp(670), width: device.pxTodp(730) }} title="快速登录提示" back={this.back.bind(this)}>
            <View style={{ padding: device.pxTodp(100), flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: device.pxTodp(170) }}>
                    <View style={{ height: device.pxTodp(100) }}>
                        <Text style={{ color: '#525252', fontSize: device.pxTodp(22) }}>玩家朋友，游客模式将无法保障数据安全！删除游戏、更换设备等有可能会清楚游戏数据。</Text>
                    </View>
                    <View style={{ height: device.pxTodp(70) }}>
                        <Text style={{ color: '#525252', fontSize: device.pxTodp(22) }}>为了您的虚拟财产安全，强力建议您进行帐号绑定！</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ padding: device.pxTodp(5) }}>
                        <IBoxButton text="继续登录" onPress={this.continue.bind(this)} style={{ backgroundColor: "#FFBE2A", borderRadius: 5, width: device.pxTodp(265), height: device.pxTodp(65), justifyContent: 'center', alignItems: 'center' }} textStyle={{ color: '#473100' }} />
                    </View>
                    <View style={{ padding: device.pxTodp(5) }}>
                        <IBoxButton text="账号升级" onPress={this.accountupdate.bind(this)} style={{ backgroundColor: "#1192D3", borderRadius: 5, width: device.pxTodp(265), height: device.pxTodp(65), justifyContent: 'center', alignItems: 'center' }} textStyle={{ color: '#DCF3FF' }} />
                    </View>


                </View>

            </View>
        </SDKBox>
    }
}