import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import SDKBox from '../components/SDKBox'
import IBoxButton from '../components/Button'
import device from '../device'
import { componentController } from '../../viewState'
export default class ChargeList extends Component {

    back(){
        componentController.changeView('userCenter');
    }

    render() {
        return <SDKBox title="充值记录" style={{ width: device.pxTodp(730), height: device.pxTodp(670) }} back={this.back.bind(this)}>
            <ScrollView>
                {
                    [1, 2, 3, 4].map(i => {
                        return <View key={i} style={{ marginTop: device.pxTodp(50), marginLeft: device.pxTodp(100), marginRight: device.pxTodp(100), backgroundColor: '#FFFFFF', borderRadius: 5, flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ padding: device.pxTodp(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <IBoxButton text="充值金额" style={{ width: device.pxTodp(165), height: device.pxTodp(60), justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderColor: '#BABABA', borderWidth: 0.5 }} textStyle={{ textAlign: 'center', color: '#000000' }} />
                                    <Text style={{ flex: 1, color: '#6A6A6D', paddingLeft: device.pxTodp(10), fontSize: device.pxTodp(30) }}>0.99 USD</Text>
                                    <IBoxButton text="删除" style={{ width: device.pxTodp(80), height: device.pxTodp(40), justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderColor: '#BABABA', borderWidth: 0.5, backgroundColor: '#C9CDD5' }} textStyle={{ textAlign: 'center', color: '#000000' }} />
                                </View>
                                <View style={{ padding: device.pxTodp(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <IBoxButton text="充值类型" style={{ width: device.pxTodp(165), height: device.pxTodp(60), justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderColor: '#BABABA', borderWidth: 0.5 }} textStyle={{ textAlign: 'center', color: '#000000' }} />
                                    <Text style={{ flex: 1, color: '#6A6A6D', paddingLeft: device.pxTodp(10), fontSize: device.pxTodp(25) }}>官方</Text>
                                </View>
                                <View style={{ padding: device.pxTodp(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <IBoxButton text="交易流水" style={{ width: device.pxTodp(165), height: device.pxTodp(60), justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderColor: '#BABABA', borderWidth: 0.5 }} textStyle={{ textAlign: 'center', color: '#000000' }} />
                                    <Text style={{ flex: 1, color: '#6A6A6D', paddingLeft: device.pxTodp(10), fontSize: device.pxTodp(25) }}>8z5546166746161</Text>
                                </View>
                                <View style={{ borderBottomColor: '#BABABA', borderWidth: 0.4, marginTop: device.pxTodp(10), marginBottom: device.pxTodp(10) }}></View>
                                <View style={{ padding: device.pxTodp(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <IBoxButton text="订单状态" style={{ width: device.pxTodp(165), height: device.pxTodp(60), justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderColor: '#BABABA', borderWidth: 0.5 }} textStyle={{ textAlign: 'center', color: '#000000' }} />
                                    <Text style={{ flex: 1, color: '#298DFE', paddingLeft: device.pxTodp(10), fontSize: device.pxTodp(25) }}>8z5546166746161</Text>
                                </View>
                                <View style={{
                                    padding: device.pxTodp(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                                    , backgroundColor: '#EAECF0', height: device.pxTodp(40), borderWidth: 1, borderLeftColor: '#D1D1D1', borderRightColor: '#D1D1D1', borderBottomColor: '#D1D1D1', borderTopColor: '#EAECF0'
                                }}>
                                    <Text style={{ flex: 1, color: '#298DFE', paddingLeft: device.pxTodp(10), fontSize: device.pxTodp(25) }}>2018-08-08 14:15:15</Text>
                                </View>

                            </View>
                        </View>
                    })
                }
                <View style={{ padding: device.pxTodp(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#EAECF0' }}>
                    <IBoxButton text="没有更多订单" style={{ height: device.pxTodp(60), flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderColor: '#BABABA', backgroundColor: '#FFFFFF', borderWidth: 0.5 }} textStyle={{ textAlign: 'center', color: '#757980' }} />
                </View>
            </ScrollView>

        </SDKBox>
    }
}