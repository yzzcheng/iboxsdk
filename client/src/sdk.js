import React, { Component } from 'react';
import { NativeModules, View } from 'react-native';
import { componentController } from './viewState'
import Apis from './apis'
import Native from './apis/native'
import device from './view/device'
import { user as UserStore } from './store'
const { GoogleService, FaceBookService, IBoxEnvironment } = NativeModules;

/*
sendMsgToNative
1  eventType 
2  map -- success : status = 200  否则  错误,需要传递message描述错误信息

*/

Native.registry(Native.INIT, (native) => {
    API.init().then(data => {
        componentController.changeView('login');
        native.sendMsgToNative(Native.INIT, {
            [Native.STATUS]: 200
        });
    }).catch(msg => {
        console.log(msg);
        native.sendMsgToNative(Native.INIT, {
            [Native.STATUS]: 400,
            [Native.MESSAGE]: JSON.stringify(msg)
        });
    });

});

// Native.resize();

Native.registry(Native.LOGIN, (native, msg) => {
    console.log(msg);
    if (msg.accountType == 0) {
        componentController.changeView('guestAccountTip', () => {
            Native.show();
        });
        // 游客登录
    } else if (msg.accountType == 1) {
        componentController.changeView('loginV2', () => {
            Native.show();
        });
    } else if (msg.accountType == 2) {
        Native.facebookLogin((userinfo) => {
            console.log(userinfo);
            Apis.facebookLogin(userinfo).then(msg => {
                if (msg.code === 200) {
                    Native.dispatcherEvent(Native.LOGIN, 200, false, {
                        userId: msg.data.userId,
                        userName: userinfo.name,
                        token: msg.token
                    });
    
                }
            }).catch(error => {
                console.log(error)
            });
        });
    } else if (msg.accountType == 3) {
        Native.googleLogin((userinfo) => {
            console.log(userinfo);
            Apis.googleLogin(userinfo).then(msg => {
                if (msg.code === 200) {
                    Native.dispatcherEvent(Native.LOGIN, 200, false, {
                        userId: msg.data.userId,
                        userName: userinfo.name,
                        token: msg.token
                    });
    
                }
            }).catch(error => {
                console.log(error)
            });
        });
    }




});

Native.registry(Native.ORDER_CREATE, (native) => {
    Native.show();
    componentController.changeView('channelListV2', () => {

    });
});

Native.registry(Native.OPEN_ACCOUNT_CENTER, (native) => {
    if(UserStore.isLogin){
        let view = "";
        if(UserStore.userType == 0) {
            view='userCenterGuest';
        } else if(UserStore.accountType == 2) {
            view='userCenterThirdParty';
        } else if(UserStore.accountType == 3) {
            view='userCenterThirdParty';
        } else {
            view='userCenterV2';
        }
        componentController.changeView(view, () => {
            Native.show();
        });
    }
    
});

Native.registry(Native.OPEN_COSTOMER_CENTER, (native) => {

    componentController.changeView('customCenter', () => {
        Native.show();
    });
});

Native.registry(Native.ON_APP_INSTALL, (native, msg) => {

    console.log(msg)
});

Native.registry(Native.ON_APP_NOT_FIND, (native, msg) => {
    console.log(msg)
});


Native.registry(Native.BIND_ACCOUNT, (native, msg) => {

    componentController.changeView('guestUpdate', () => {
        Native.show();
    });
});


Native.registry(Native.AUTO_LOGIN, (native, msg) => {

    componentController.changeView('guestUpdate', () => {
        Native.show();
    });
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
            width: 0,
            height: 0,
            props: null
        };
    }

    changeView(view, callback, props) {
        let width = 0, height = 0;
        if (view.size) {
            if (view.size.full) {
                width = device.width;
                height = device.height;
            } else {
                width = device.pxTodp(view.size.width);
                height = device.pxTodp(view.size.height);
            }

            Native.resize(width, height);
        } else {
            width = null;
            height = null;
        }
        this.setState({
            view,
            component: view.component,
            width,
            height,
            props
        }, () => {
            if (callback) callback();
        });
    }

    componentWillMount() {
        componentController.addListener((view, callback, props) => {
            this.changeView(view, callback, props);
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
        const { component: Component, width, height, props } = this.state;
        return (
            <View style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 5, flex: 1 }} >
                {Component ? <Component width={width} height={height} {...props} /> : null}
            </View>
        );
    }
}


