import { Dimensions,NativeModules } from 'react-native'
const { width, height } = Dimensions.get('window')
const vDesignSize = {
    width: 1334,
    height: 750
};

const hDesignSize = {
    height: 1334,
    width: 750
};

let designSize = vDesignSize;

if (width > height) designSize = vDesignSize;
else designSize = hDesignSize;


let devAssertPath = 'iboxsdk/src/res/img/';
let assertPath = 'file:/data/user/0/com.mythsgame.bmpfbowq/files/img/';
const assertMap = {
    ['login/MG-logo.png']: require(devAssertPath + 'login/MG-logo.png'),
    ['login/guest.png']: require(devAssertPath + 'login/guest.png'),
    ['login/fb-icon.png']: require(devAssertPath + 'login/fb-icon.png'),
    ['login/mg-icon.png']: require(devAssertPath + 'login/mg-icon.png'),
    ['login/google-icon.png']: require(devAssertPath + 'login/google-icon.png'),
    ['customcenter/sanjiao-hide.png']: require(devAssertPath + 'customcenter/sanjiao-hide.png'),
    ['customcenter/sanjiao-show.png']: require(devAssertPath + 'customcenter/sanjiao-show.png'),

    ['payment/info.png']: require(devAssertPath + 'payment/info.png'),


    ['platformlogin/MG-logo.png']: require(devAssertPath + 'platformlogin/MG-logo.png'),
    ['platformlogin/password.png']: require(devAssertPath + 'platformlogin/password.png'),
    ['platformlogin/user.png']: require(devAssertPath + 'platformlogin/user.png'),

    ['usercenter/charge.png']: require(devAssertPath + 'usercenter/charge.png'),
    ['usercenter/customer.png']: require(devAssertPath + 'usercenter/customer.png'),
    ['usercenter/help.png']: require(devAssertPath + 'usercenter/help.png'),
    ['usercenter/i-1.png']: require(devAssertPath + 'usercenter/i-1.png'),
    ['usercenter/i-2.png']: require(devAssertPath + 'usercenter/i-2.png'),
    ['usercenter/i-3.png']: require(devAssertPath + 'usercenter/i-3.png'),
    ['usercenter/i-4.png']: require(devAssertPath + 'usercenter/i-4.png'),
    ['usercenter/use-icon.png']: require(devAssertPath + 'usercenter/use-icon.png'),
    ['usercenter/user.png']: require(devAssertPath + 'usercenter/user.png'),

    ['array-down.png']: require(devAssertPath + 'array-down.png'),
    ['back.png']: require(devAssertPath + 'back.png'),
    ['close.png']: require(devAssertPath + 'close.png'),
    ['facebook.png']: require(devAssertPath + 'facebook.png'),
    ['guest.png']: require(devAssertPath + 'guest.png'),
    ['loading.gif']: require(devAssertPath + 'loading.gif'),
    ['logo.png']: require(devAssertPath + 'logo.png'),
    ['password.png']: require(devAssertPath + 'password.png'),
    ['platform.png']: require(devAssertPath + 'platform.png'),
    ['return.png']: require(devAssertPath + 'return.png'),
    ['user.png']: require(devAssertPath + 'user.png'),
}

export default {
    height: height,
    width: width,
    assertPath:'',
    pxTodp(px) {
        return this.width * px / designSize.width;
    },
    getAssert(name) {
        if(this.isDebug()){
            return assertMap[name];
        } else {
            return {
                uri:"file:" + this.assertPath + name
            };
        }
    },
    setAssertPath(path){
        this.assertPath = path;
    },
    isDebug(){
        const { scriptURL } = NativeModules.SourceCode
        const devEvn = scriptURL.split('&')[1]
        return devEvn === 'dev=true'
    }
}