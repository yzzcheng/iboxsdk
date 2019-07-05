import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import SDKBox from '../components/SDKBox'
import { white } from 'ansi-colors';
import device from '../device'
import { componentController } from '../../viewState'
export default class PayChannel extends Component {


    onSelectChannel(){
        componentController.changeView('productList');
    }

    render() {
        return <SDKBox title="支付列表">
            <View style={{ backgroundColor: white, flexDirection: 'row' }}>
                <View style={{ height: device.pxTodp(550), flexDirection: 'row', flexWrap: 'wrap' }}>
                    <TouchableWithoutFeedback onPress={this.onSelectChannel.bind(this)}>
                        <View style={{ width: device.pxTodp(330), height: device.pxTodp(140), backgroundColor: 'white', borderRadius: 5, margin: device.pxTodp(20), flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: device.pxTodp(50), height: device.pxTodp(50) }} source={require('../../res/img/facebook.png')} />
                            <Text style={{ textAlign: 'center', color: 'black' }}>facebook</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.onSelectChannel.bind(this)}>
                        <View style={{ width: device.pxTodp(330), height: device.pxTodp(140), backgroundColor: 'white', borderRadius: 5, margin: device.pxTodp(20), flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: device.pxTodp(50), height: device.pxTodp(50) }} source={require('../../res/img/facebook.png')} />
                            <Text style={{ textAlign: 'center', color: 'black' }}>facebook</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.onSelectChannel.bind(this)}>
                        <View style={{ width: device.pxTodp(330), height: device.pxTodp(140), backgroundColor: 'white', borderRadius: 5, margin: device.pxTodp(20), flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: device.pxTodp(50), height: device.pxTodp(50) }} source={require('../../res/img/facebook.png')} />
                            <Text style={{ textAlign: 'center', color: 'black' }}>facebook</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </SDKBox>
    }
}