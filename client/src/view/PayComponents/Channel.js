import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import SDKBox from '../components/SDKBox'
import { white } from 'ansi-colors';
import device from '../device'
import { componentController } from '../../viewState'
export default class PayChannel extends Component {

    constructor(props) {
        super(props);
        this.onSelectChannel = this.onSelectChannel.bind(this);
        console.log("onSelectChannel")
    }
    onSelectChannel() {
        console.log("onSelectChannel")
        componentController.changeView('productList');
    }

    render() {
        const { width, height } = this.props;

        return <SDKBox title="支付列表" style={{ width: width, height: height }}>
            <View style={{ backgroundColor: white, flexDirection: 'row' }}>

                <View style={{ height: device.pxTodp(550), flexDirection: 'row', flexWrap: 'wrap' }}>
                    <TouchableWithoutFeedback onPressIn={this.onSelectChannel}>
                        <View style={{ width: device.pxTodp(330), height: device.pxTodp(140), backgroundColor: 'white', borderRadius: 5, margin: device.pxTodp(20), flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: device.pxTodp(50), height: device.pxTodp(50) }} source={device.getAssert('facebook.png')} />
                            <Text style={{ textAlign: 'center', color: 'black' }}>facebook</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPressIn={this.onSelectChannel}>
                        <View style={{ width: device.pxTodp(330), height: device.pxTodp(140), backgroundColor: 'white', borderRadius: 5, margin: device.pxTodp(20), flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: device.pxTodp(50), height: device.pxTodp(50) }} source={device.getAssert('facebook.png')} />
                            <Text style={{ textAlign: 'center', color: 'black' }}>facebook</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </SDKBox>
    }
}