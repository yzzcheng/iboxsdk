import React, { Component } from 'react';
import { NativeModules, Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import Apis from '../apis'
import { componentController } from '../viewState'
import device from './device'
import IBoxTab from './components/Tab'
import SDKBox from './components/SDKBox'
const { ReactEventListener, IBoxEnvironment, FaceBookService } = NativeModules;


export default class CustomCenter extends Component {

    back() {
        componentController.changeView('userCenter');
    }

    renderHelperCenter() {
        return <View style={{ flexDirection: 'column', marginLeft: device.pxTodp(70), marginRight: device.pxTodp(70), height: device.pxTodp(300), marginTop: device.pxTodp(40), backgroundColor: '#FFFFFF' }}>
            <View style={{ paddingTop: device.pxTodp(20), paddingBottom: device.pxTodp(20), borderBottomColor: '#B9B9B9', borderBottomWidth: 0.5, flexDirection: 'row' }}>
                <Text style={{ color: '#6A6A6D', fontSize: device.pxTodp(20), fontWeight: 'bold' }}>亲，常见问题有如下</Text>
            </View>
            <View style={{ paddingTop: device.pxTodp(20), paddingBottom: device.pxTodp(20), borderBottomColor: '#B9B9B9', borderBottomWidth: 0.5, borderStyle: 'dashed', flexDirection: 'row' }}>
                <Image style={{ width: device.pxTodp(16), height: device.pxTodp(19) }} source={device.getAssert('customcenter/sanjiao-show.png')} />
                <Text style={{ color: '#6A6A6D', fontSize: device.pxTodp(16), fontWeight: 'bold' }}>如何找回密码？</Text>
            </View>
            <View style={{ paddingTop: device.pxTodp(20), paddingBottom: device.pxTodp(20), borderBottomColor: '#B9B9B9', borderBottomWidth: 0.5, flexDirection: 'row' }}>
                <Image style={{ width: device.pxTodp(16), height: device.pxTodp(19) }} source={device.getAssert('customcenter/sanjiao-show.png')} />
                <Text style={{ color: '#6A6A6D', fontSize: device.pxTodp(16), fontWeight: 'bold' }}>如何升级游客账号？</Text>
            </View>
        </View>;
    }


    render() {

        const items = [{
            key: 1,
            title: '帮助中心',
            content: this.renderHelperCenter(),
        }, {
            key: 2,
            title: '联系客服',
            content: this.renderHelperCenter()
        }];


        return <SDKBox title="客服帮助中心" style={{ height: device.pxTodp(670), width: device.pxTodp(730) }} back={this.back.bind(this)}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <View style={{ width: device.pxTodp(550), height: device.pxTodp(460) }}>
                    <IBoxTab items={items} />
                </View>

            </View>

        </SDKBox>

    }
}