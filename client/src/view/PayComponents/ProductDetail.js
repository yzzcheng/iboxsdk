import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import SDKBox from '../components/SDKBox'
import IBoxButton from '../components/Button'
import device from '../device'
import { componentController } from '../../viewState'
export default class ProductDetail extends Component {


    back() {
        componentController.changeView('productList');
    }

    render() {
        return <SDKBox title="确认支付" style={{width:device.pxTodp(730),height:device.pxTodp(670)}} back={this.back.bind(this)}>
            <View style={{ height: device.pxTodp(550), flexDirection: 'column', marginLeft: device.pxTodp(120), marginRight: device.pxTodp(120), marginTop: device.pxTodp(30), marginBottom: device.pxTodp(30) }}>
                <Text style={{ color: '#303038', fontSize: device.pxTodp(36) }}>GooglePlay</Text>
                <View style={{ borderBottomColor: '#A6A6A8', borderBottomWidth: 1, borderStyle: 'dashed', borderRadius: 1, marginTop: device.pxTodp(20), marginBottom: device.pxTodp(20) }}></View>
                <View style={{ flexDirection: 'row'}}>
                    <Image style={{ width: device.pxTodp(130), height: device.pxTodp(130) }} source={require('../../res/img/facebook.png')} />
                    <View style={{ flex: 1, flexDirection: 'column', marginLeft: device.pxTodp(25) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{flex: 1, fontSize: device.pxTodp(30), color: '#303038' }}>普通档</Text>
                            <View style={{  justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableWithoutFeedback>
                                    <Image style={{ width: device.pxTodp(50), height: device.pxTodp(50) }} source={require('../../res/img/payment/info.png')} />
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <Text style={{flex: 1, fontSize: device.pxTodp(33), color: '#ED4C2C',marginTop:device.pxTodp(30)}}>USD 0.99</Text>
                    </View>
                </View>
                <View style={{marginTop:device.pxTodp(40)}}>
                    <IBoxButton text="确认支付" style={{borderWidth:1,borderColor:'#C09C6A',borderRadius:5,backgroundColor:'#FFBE2A',borderRadius:5,height:device.pxTodp(70),justifyContent: 'center', alignItems: 'center'}} textStyle={{color:'#303038',textAlign:'center'}}/>
                </View>
                <View style={{marginTop:device.pxTodp(20)}}>
                    <IBoxButton text="更多支付方式" style={{borderWidth:1,borderColor:'#C09C6A',borderRadius:5,backgroundColor:'#1192D3',borderRadius:5,height:device.pxTodp(70),justifyContent: 'center', alignItems: 'center'}} textStyle={{color:'#DCF3FF',textAlign:'center'}}/>
                </View>
            </View>
        </SDKBox>
    }
}