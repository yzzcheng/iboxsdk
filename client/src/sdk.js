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
    componentController.changeView('login');
});




export default class APP extends Component {

    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return {
            view: 'login',
            component: null,
        };
    }

    changeView(view) {
        if(view.size){
            Native.resize(device.pxTodp(view.size.width),device.pxTodp(view.size.height));
        }
        this.setState({
            view,
            component: view.component
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
        const { component: Component } = this.state;
        return (
            <View style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 5 ,flex:1 }} >
                {Component ? <Component /> : null}
            </View>
        );
    }
}


