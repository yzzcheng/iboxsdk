import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import SDKBox from '../components/SDKBox'
import IBoxButton from '../components/Button'
import device from '../device'
import { componentController } from '../../viewState'
export default class ChargeList extends Component {
    render() {
        return <SDKBox title="充值记录" style={{ width: device.pxTodp(730), height: device.pxTodp(670) }}>
            <View style={{ marginTop: device.pxTodp(50), marginLeft: device.pxTodp(50), marginRight: device.pxTodp(100), backgroundColor: '#FFFFFF', borderRadius: 5,flexDirection:'column' }}>
                <View style={{flexDirection:'column'}}>
                    <View style={{padding:device.pxTodp(10),flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <IBoxButton text="充值金额" style={{width:device.pxTodp(165),height:device.pxTodp(60),justifyContent:'center',alignItems:'center',borderRadius:5,borderColor:'#BABABA',borderWidth:0.5}} textStyle={{textAlign:'center',color:'#000000'}}/>
                        <Text style={{flex:1,color:'#6A6A6D',paddingLeft:device.pxTodp(10),fontSize:device.pxTodp(30)}}>0.99 USD</Text>
                        <IBoxButton text="删除" style={{width:device.pxTodp(80),height:device.pxTodp(40),justifyContent:'center',alignItems:'center',borderRadius:5,borderColor:'#BABABA',borderWidth:0.5,backgroundColor:'#C9CDD5'}} textStyle={{textAlign:'center',color:'#000000'}}/>
                    </View>
                    <View style={{padding:device.pxTodp(10),flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <IBoxButton text="充值类型" style={{width:device.pxTodp(165),height:device.pxTodp(60),justifyContent:'center',alignItems:'center',borderRadius:5,borderColor:'#BABABA',borderWidth:0.5}} textStyle={{textAlign:'center',color:'#000000'}}/>
                        <Text style={{flex:1,color:'#6A6A6D',paddingLeft:device.pxTodp(10),fontSize:device.pxTodp(25)}}>官方</Text>
                    </View>
                    <View style={{padding:device.pxTodp(10),flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <IBoxButton text="交易流水" style={{width:device.pxTodp(165),height:device.pxTodp(60),justifyContent:'center',alignItems:'center',borderRadius:5,borderColor:'#BABABA',borderWidth:0.5}} textStyle={{textAlign:'center',color:'#000000'}}/>
                        <Text style={{flex:1,color:'#6A6A6D',paddingLeft:device.pxTodp(10),fontSize:device.pxTodp(25)}}>8z5546166746161</Text>
                    </View>
                    <View style={{borderBottomColor:'#BABABA',borderWidth:0.4,marginTop:device.pxTodp(10),marginBottom:device.pxTodp(10)}}></View>
                    <View style={{padding:device.pxTodp(10),flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <IBoxButton text="订单状态" style={{width:device.pxTodp(165),height:device.pxTodp(60),justifyContent:'center',alignItems:'center',borderRadius:5,borderColor:'#BABABA',borderWidth:0.5}} textStyle={{textAlign:'center',color:'#000000'}}/>
                        <Text style={{flex:1,color:'#298DFE',paddingLeft:device.pxTodp(10),fontSize:device.pxTodp(25)}}>8z5546166746161</Text>
                    </View>
                </View>
            </View>
        </SDKBox>
    }
}