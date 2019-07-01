import React, { Component } from 'react';
import { DeviceEventEmitter, NativeModules, View } from 'react-native';
import Common from './res/styles/common'
import ComponentList,{componentController} from './viewState'
import Login from './view/Login'
import API from './apis'
import Native from './apis/native'
const { ReactEventListener, GoogleService, FaceBookService, IBoxEnvironment } = NativeModules;

/*
sendMsgToNative
1  eventType 
2  map -- success : status = 200  否则  错误,需要传递message描述错误信息

*/

Native.registry(Native.INIT,(native)=>{
    componentController.changeView('login');
    native.sendMsgToNative(Native.INIT,{
        [Native.STATUS]:200
    });
});

Native.registry(Native.LOGIN,(native)=>{
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
        const { component } = this.state;
        let currentCom = component;
        for (var i = 0;i<ComponentList.length;i++) {
            let com = ComponentList[i];
            if (com.componentName === view) {
                currentCom = com.component;
            }
        }
        this.setState({
            view,
            component: currentCom
        });
    }

    componentWillMount() {
        componentController.addListener((view)=>{
            this.changeView(view);
        })
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
        const { view,component:Component } = this.state;
        return (
            <View style={{backgroundColor:'white' }} >
                {Component?<Component/>:null}
            </View>
        );
    }
}


