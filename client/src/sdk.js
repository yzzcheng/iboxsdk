import React, { Component } from 'react';
import { DeviceEventEmitter,NativeModules,Button, View } from 'react-native';
import Login from './view/Login'
import Risgistry from './view/Risgistry'

const {ReactEventListener,GoogleInAppBilling} = NativeModules;

/*
sendMsgToNative
1  eventType 
2  map -- success : status = 200  否则  错误,需要传递message描述错误信息

*/

export default class APP extends Component {

    

    

    constructor(props){
        super(props);
        this.state = this.initState();
    }

    initState(){
        return {
            view:'login',

        };
    }

    componentWillMount() {
        this.initHandler = DeviceEventEmitter.addListener(ReactEventListener.INIT,(e)=>{
            console.log(ReactEventListener.INIT,e);
            ReactEventListener.sendMsgToNative(ReactEventListener.INIT,{
                [ReactEventListener.STATUS]:200,
            });
        });
        this.loginHandler = DeviceEventEmitter.addListener(ReactEventListener.LOGIN,(e)=>{
            this.setState({view:'login'});
            ReactEventListener.sendMsgToNative(ReactEventListener.LOGIN,{
                [ReactEventListener.STATUS]:200,
                userName:'linlin.zhang',
                userId:123
            });
        });

        this.finishOrderHandler = DeviceEventEmitter.addListener(ReactEventListener.ORDER_FINISH,(finishBean)=>{
            console.log("ORDER_FINISH",finishBean);
            // 请求后端接口完成订单
            //TODO
            //通知Google消单
            ReactEventListener.sendMsgToNative(ReactEventListener.ORDER_FINISH,{
                [ReactEventListener.STATUS]:200,
                ...finishBean
            });
        });
        this.createOrderHandler = DeviceEventEmitter.addListener(ReactEventListener.ORDER_CREATE,(e)=>{
            console.log('ORDER_CREATE',e)
            // ReactEventListener.sendMsgToNative(ReactEventListener.ORDER_FINISH,{
            //     [ReactEventListener.STATUS]:200,
            // });
        });
        
        
    }

    componentWillUnmount() {
        this.initHandler.remove();
        this.loginHandler.remove();
        this.createOrderHandler.remove();
    }
    
    onGoogleInAppBilling(){
        GoogleInAppBilling.startPayment('product_4.99_xmyxwno1');
    }

    render() {
      const {view} = this.state;
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
           {view === 'login'?<Login/>:null} 
           {view === 'risgistry'?<Risgistry/>:null} 
           <Button title="GoogleInAppBilling" onPress={this.onGoogleInAppBilling.bind(this)}/>
        </View>
      );
    }
  }


