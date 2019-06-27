import React, { Component } from 'react';
import { DeviceEventEmitter, NativeModules, View } from 'react-native';
import Login from './view/Login'
import Risgistry from './view/Risgistry'
import Payment from './view/Payment'
import API from './apis'
const { ReactEventListener, GoogleService, FaceBookService,IBoxEnvironment } = NativeModules;

/*
sendMsgToNative
1  eventType 
2  map -- success : status = 200  否则  错误,需要传递message描述错误信息

*/


export default class APP extends Component {

    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return {
            view: 'login',

        };
    }

    componentWillMount() {
        this.initHandler = DeviceEventEmitter.addListener(ReactEventListener.INIT, (e) => {
            console.log(ReactEventListener.INIT, e);
            ReactEventListener.sendMsgToNative(ReactEventListener.INIT, {
                [ReactEventListener.STATUS]: 200,
            });
        });
        this.loginHandler = DeviceEventEmitter.addListener(ReactEventListener.LOGIN, (e) => {
            this.setState({ view: 'login' });
           
        });

        this.finishOrderHandler = DeviceEventEmitter.addListener(ReactEventListener.ORDER_FINISH, (finishBean) => {
            console.log("ORDER_FINISH", finishBean);
            // 请求后端接口完成订单
            //TODO
            //通知Google消单
            ReactEventListener.sendMsgToNative(ReactEventListener.ORDER_FINISH, {
                [ReactEventListener.STATUS]: 200,
                ...finishBean
            });
        });
        this.createOrderHandler = DeviceEventEmitter.addListener(ReactEventListener.ORDER_CREATE, (orderinfo) => {
            console.log('ORDER_CREATE', orderinfo)
            this.setState({ view: 'pay' });
          
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

    onGoogleInAppBilling() {
        GoogleService.startPlusPayment('product_0.99_xmyxwno1', "com.bdgames.xmyxwno1://pluspay");
    }

    onFacebookLogin() {
        FaceBookService.doLogin((res) => {
            console.log(res)
        })
    }
    launchToApp() {
        GoogleService.launchToApp('com.bdgames.xmyxwno1');
    }
    render() {
        const { view } = this.state;
        console.log(view);
        return (
            <View>
                {view === 'login' ? <Login /> : null}
                {view === 'risgistry' ? <Risgistry /> : null}
                {view === 'pay' ? <Payment /> : null}
                {/* <Button title="插件支付" onPress={this.onGoogleInAppBilling.bind(this)} />
                <Button title="FaceBookLogin" onPress={this.onFacebookLogin.bind(this)} />
                <Button title="GotoGoogle" onPress={this.launchToApp.bind(this)} /> */}
            </View>
        );
    }
}


