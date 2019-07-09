import React, { Component } from 'react';
import { DeviceEventEmitter, NativeModules, View } from 'react-native';

import ComponentList, { componentController } from './viewState'
import API from './apis'
import Native from './apis/native'
import device from './view/device'
const { ReactEventListener, GoogleService, FaceBookService, IBoxEnvironment } = NativeModules;

/*
sendMsgToNative
1  eventType 
2  map -- success : status = 200  否则  错误,需要传递message描述错误信息

*/

Native.registry(Native.INIT, (native) => {
    Native.show();
    componentController.changeView('login');
    native.sendMsgToNative(Native.INIT, {
        [Native.STATUS]: 200
    });
    // API.init().then(data=>{
    //     componentController.changeView('login');
    //     native.sendMsgToNative(Native.INIT,{
    //         [Native.STATUS]:200
    //     });
    // }).catch(msg=>{
    //     native.sendMsgToNative(Native.INIT,{
    //         [Native.STATUS]:400,
    //         [Native.MESSAGE]:msg
    //     });
    // });

});

// Native.resize();

Native.registry(Native.LOGIN, (native) => {
    Native.show();
    componentController.changeView('login');
});

Native.registry(Native.ORDER_CREATE, (native) => {
    Native.show();
    componentController.changeView('payChannel');
});

Native.registry(Native.OPEN_ACCOUNT_CENTER, (native) => {
    Native.show();
    componentController.changeView('userCenter');
});

Native.registry(Native.OPEN_COSTOMER_CENTER, (native) => {
    Native.show();
    componentController.changeView('customCenter');
});




export default class APP extends Component {

    constructor(props) {
        super(props);
        this.state = this.initState();
        device.setAssertPath(props.assert_path);
       
    }

    initState() {
        return {
            view: 'login',
            component: null,
            width:0,
            height:0,
        };
    }

    changeView(view) {
        let width = 0,height = 0;
        if(view.size){
            if(view.size.full){
                width = device.width - device.pxTodp(65)*2;
                height = device.height- device.pxTodp(65)*2;
            }else {
                width = device.pxTodp(view.size.width);
                height = device.pxTodp(view.size.height);
            }
            
            Native.resize(width,height);
        }else {
            width = null;
            height = null;
        }
        this.setState({
            view,
            component: view.component,
            width,
            height
        });
    }

    componentWillMount() {
        componentController.addListener((view) => {
            this.changeView(view);
        });
    }

    componentWillUnmount() {
        componentController.removeListener();
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
        const { component: Component,width,height } = this.state;
        return (
            <View style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 5 ,flex:1 }} >
                {Component ? <Component width={width} height={height} /> : null}
            </View>
        );
    }
}


