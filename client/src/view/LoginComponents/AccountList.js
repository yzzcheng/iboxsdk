import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Button } from 'react-native';
import InputArea from '../components/InputArea'
import SDKBox from '../components/SDKBox'
import IBoxButton from '../components/Button'
import { componentController } from '../../viewState'
import Native from '../../apis/native'
import device from '../device'
import Common, { extendStyle } from '../../res/styles/common_v2'
export default class AccountList extends Component {

    close() {
        const { close } = this.props;
        if (close) {
            close();
        }
        Native.hide();
    }

    render() {
        return <View style={extendStyle(Common.margin_20, { flex: 1 })}>

            <View style={extendStyle(Common.margin_bottom_20,{ height: device.pxTodp(40), flexDirection: 'row' })}>
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
                <View style={{ flexDirection: 'row' }}>
                    <View style={extendStyle(Common.margin_min, { height: device.pxTodp(25), justifyContent: 'center',borderWidth:1,borderStyle:'solid',borderColor:'#54a8f7',borderRadius:device.pxTodp(25),overflow:'hidden' })}>
                        <Image style={{ width: device.pxTodp(25), height: device.pxTodp(25) }} source={device.getAssertV2('people_fill.png')} />
                    </View>
                    <View style={extendStyle(Common.margin_min, { height: device.pxTodp(30), flexDirection: 'column', justifyContent: 'center', flex: 1 })}>
                        <View>
                            <Text style={extendStyle(Common.text_content)}>游客：48958340580943850</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={extendStyle(Common.margin_right_min,{ width: device.pxTodp(12), height: device.pxTodp(12)})} source={device.getAssertV2('time.png')} />
                            <Text style={extendStyle(Common.text_tip)}>上次登录10分钟前</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: device.pxTodp(30) }}>
                        <View style={{ alignItems: 'center', position: 'absolute', width: device.pxTodp(30), height: device.pxTodp(15), top: 0, backgroundColor: '#33cc33' }}><Text>常用</Text></View>
                        <View>
                            <TouchableWithoutFeedback>
                                <Image style={extendStyle({ width: device.pxTodp(14), height: device.pxTodp(14) }, Common.margin_right_min)} source={device.getAssertV2('unfold.png')} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </View>

            <IBoxButton text="登录" style={extendStyle(Common.margin_top_20, { backgroundColor: '#F2CC4A', height: device.pxTodp(30) })} textStyle={{ color: 'white' }} />
            <IBoxButton text="其他账号登录?" style={extendStyle(Common.margin_top_20,{ height: device.pxTodp(30) })} textStyle={extendStyle(Common.text_tip, { color: '#68696A', fontWeight: '100' })} />

        </View>;
    }
}