import { Dimensions,NativeModules,PixelRatio } from 'react-native'
const { width, height } = Dimensions.get('window')

const pxPerdp = PixelRatio.get();
const vDesignSize = {
    width: 1334,
    height: 750
};

const hDesignSize = {
    height: 1334,
    width: 750
};

const vDesignSizeV2 = {
    height: 375,
    width: 810
};

const hDesignSizeV2 = {
    height: 810,
    width : 375
};


let designSize = hDesignSizeV2;

if (width > height) designSize = vDesignSizeV2;
else designSize = hDesignSizeV2;


let devAssertPath = 'iboxsdk/src/res/img/';
let devAssertV2Path = 'iboxsdk/src/res/img_v2/'
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
    ['platform.png']: require(devAssertPath + 'platform.png'),
    ['password.png']: require(devAssertPath + 'password.png'),
    ['return.png']: require(devAssertPath + 'return.png'),
    ['user.png']: require(devAssertPath + 'user.png'),
}


const assertV2Map = {
    ['back.png']:require(devAssertV2Path + 'back.png'),
    ['close.png']:require(devAssertV2Path + 'close.png'),
    ['lock.png']:require(devAssertV2Path + 'lock.png'),
    ['people.png']:require(devAssertV2Path + 'people.png'),
    ['unfold.png']:require(devAssertV2Path + 'unfold.png'),
    ['logo.png']:require(devAssertV2Path + 'logo.png'),
    ['close-gray.png']:require(devAssertV2Path + 'close-gray.png'),
    ['people_fill.png']:require(devAssertV2Path + 'people_fill.png'),
    ['time.png']:require(devAssertV2Path + 'time.png'),
    ['delete.png']:require(devAssertV2Path + 'delete.png'),
    ['add.png']:require(devAssertV2Path + 'add.png'),
    ['delete-2.png']:require(devAssertV2Path + 'delete-2.png'), 
    ['lock_gray.png']:require(devAssertV2Path + 'lock_gray.png'),
    ['mobile_fill.png']:require(devAssertV2Path + 'mobile_fill.png'),
    ['community_fill.png']:require(devAssertV2Path + 'community_fill.png'),
    ['mail.png']:require(devAssertV2Path + 'mail.png'),
    ['question_fill.png']:require(devAssertV2Path + 'question_fill.png'),
    ['array-down.png']:require(devAssertV2Path + 'array-down.png'),
    ['icon-diamond.png']:require(devAssertV2Path + 'icon-diamond.png'),
};

export default {
    height: height,
    width: width,
    pxPerdp:pxPerdp,
    assertPath:'',
    pxTodp(px) {
        console.log(this.width,px,designSize.width);
        return this.width * px / designSize.width;
    },
    dpTopx(dp){
        return dp/this.pxPerdp;
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
    getAssertV2(name) {
        if(this.isDebug()){
            return assertV2Map[name];
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