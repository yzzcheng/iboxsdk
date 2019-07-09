import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import SDKBox from '../components/SDKBox'
import { white } from 'ansi-colors';
import device from '../device'
import { componentController } from '../../viewState'

export default class ProductList extends Component {

    back() {
        componentController.changeView('payChannel');
        
    }
    selectProduct(){
        componentController.changeView('productDetail');
    }

    render() {
        const { width, height } = this.props;
        return <SDKBox title="支付列表" back={this.back.bind(this)} style={{ width: width, height: height }}>
            <View style={{ height: device.pxTodp(550), flexDirection: 'row', flexWrap: 'wrap'}}>
                <TouchableWithoutFeedback onPress={this.selectProduct.bind(this)}>
                    <View style={{ width: device.pxTodp(170), height: device.pxTodp(200), backgroundColor: 'white', borderRadius: 5, margin: device.pxTodp(20), flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ width: 50, height: 50 }} source={device.getAssert('facebook.png')} />
                        <Text style={{ textAlign: 'center', color: '#38383F',fontSize:device.pxTodp(16) }}>超级钻石</Text>
                        <Text style={{ textAlign: 'center', color: '#E34141',fontSize:device.pxTodp(16) }}>USD 0.99</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.selectProduct.bind(this)}>
                    <View style={{ width: device.pxTodp(170), height: device.pxTodp(200), backgroundColor: 'white', borderRadius: 5, margin: device.pxTodp(20), flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ width: 50, height: 50 }} source={device.getAssert('facebook.png')} />
                        <Text style={{ textAlign: 'center', color: '#38383F',fontSize:device.pxTodp(16) }}>超级钻石</Text>
                        <Text style={{ textAlign: 'center', color: '#E34141',fontSize:device.pxTodp(16) }}>USD 0.99</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.selectProduct.bind(this)}>
                    <View style={{ width: device.pxTodp(170), height: device.pxTodp(200), backgroundColor: 'white', borderRadius: 5, margin: device.pxTodp(20), flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ width: 50, height: 50 }} source={device.getAssert('facebook.png')} />
                        <Text style={{ textAlign: 'center', color: '#38383F',fontSize:device.pxTodp(16) }}>超级钻石</Text>
                        <Text style={{ textAlign: 'center', color: '#E34141',fontSize:device.pxTodp(16) }}>USD 0.99</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </SDKBox>
    }
}