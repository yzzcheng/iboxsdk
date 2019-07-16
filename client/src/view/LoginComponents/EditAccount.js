import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Button, ScrollView } from 'react-native';
import InputArea from '../components/InputArea'
import SDKBox from '../components/SDKBox'
import IBoxButton from '../components/Button'
import { componentController } from '../../viewState'
import Native from '../../apis/native'
import device from '../device'
import Common, { extendStyle } from '../../res/styles/common_v2'
export default class EditAccount extends Component {

    close() {
        const { close } = this.props;
        if (close) {
            close();
        }
        Native.hide();
    }

    login(){
        componentController.changeView('loginV2');
    }

    render() {
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
                <ScrollView style={{height: device.pxTodp(105)}}>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#BEC0C0', borderStyle: 'solid' }}>
                        <View style={extendStyle(Common.margin_min, { height: device.pxTodp(25), justifyContent: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: '#54a8f7', borderRadius: device.pxTodp(25), overflow: 'hidden' })}>
                            <Image style={{ width: device.pxTodp(25), height: device.pxTodp(25) }} source={device.getAssertV2('people_fill.png')} />
                        </View>
                        <View style={extendStyle(Common.margin_min, { height: device.pxTodp(30), flexDirection: 'column', justifyContent: 'center', flex: 1 })}>
                            <View>
                                <Text style={extendStyle(Common.text_content)}>游客：48958340580943850</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={extendStyle(Common.margin_right_min, { width: device.pxTodp(12), height: device.pxTodp(12) })} source={device.getAssertV2('time.png')} />
                                <Text style={extendStyle(Common.text_tip)}>上次登录10分钟前</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: device.pxTodp(30) }}>
                            <View>
                                <TouchableWithoutFeedback>
                                    <Image style={extendStyle({ width: device.pxTodp(14), height: device.pxTodp(14) }, Common.margin_right_min)} source={device.getAssertV2('delete.png')} />
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#BEC0C0', borderStyle: 'solid' }}>
                        <View style={extendStyle(Common.margin_min, { height: device.pxTodp(25), justifyContent: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: '#54a8f7', borderRadius: device.pxTodp(25), overflow: 'hidden' })}>
                            <Image style={{ width: device.pxTodp(25), height: device.pxTodp(25) }} source={device.getAssertV2('people_fill.png')} />
                        </View>
                        <View style={extendStyle(Common.margin_min, { height: device.pxTodp(30), flexDirection: 'column', justifyContent: 'center', flex: 1 })}>
                            <View>
                                <Text style={extendStyle(Common.text_content)}>游客：48958340580943850</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={extendStyle(Common.margin_right_min, { width: device.pxTodp(12), height: device.pxTodp(12) })} source={device.getAssertV2('time.png')} />
                                <Text style={extendStyle(Common.text_tip)}>上次登录10分钟前</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: device.pxTodp(30) }}>
                            <View>
                                <TouchableWithoutFeedback>
                                    <Image style={extendStyle({ width: device.pxTodp(14), height: device.pxTodp(14) }, Common.margin_right_min)} source={device.getAssertV2('delete.png')} />
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: device.pxTodp(30) }}>
                    <IBoxButton onPress={this.login.bind(this)} icon={device.getAssertV2('add.png')} text="添加新账号" style={extendStyle({ height: device.pxTodp(30), flex: 1 })} textStyle={extendStyle(Common.text_tip, { color: '#68696A', fontWeight: '100' })} />
                    <IBoxButton icon={device.getAssertV2('delete-2.png')} text="删除账号" style={extendStyle({ height: device.pxTodp(30), flex: 1 })} textStyle={extendStyle(Common.text_tip, { color: '#68696A', fontWeight: '100' })} />
                </View>
            </View>



        </View>;
    }
}