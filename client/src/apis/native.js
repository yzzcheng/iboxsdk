import { DeviceEventEmitter, NativeModules, View } from 'react-native';
const { ReactEventListener, GoogleService, FaceBookService,IBoxEnvironment } = NativeModules;
export default {
    INIT:ReactEventListener.INIT,   //初始化事件
    LOGIN:ReactEventListener.LOGIN,     //登录事件
    ORDER_CREATE:ReactEventListener.ORDER_CREATE,  // 下单事件
    ORDER_FINISH:ReactEventListener.ORDER_FINISH,  //订单完成事件
    GOOGLE_PAY_FINISH:ReactEventListener.GOOGLE_PAY_FINISH, //本地包支付
    GOOGLE_PLUS_PAY_FINISH:ReactEventListener.GOOGLE_PLUS_PAY_FINISH, // 插件支付
    AUTO_LOGIN:ReactEventListener.AUTO_LOGIN, //自动登录
    STATUS:ReactEventListener.STATUS,
    registry(event,callback){
        if(event === this.INIT) {
            this.initHandler = DeviceEventEmitter.addListener(ReactEventListener.INIT, (e) => {
                console.log(ReactEventListener.INIT, e);
                callback(ReactEventListener,e);
            });
        } else if(event === this.LOGIN){
            this.loginHandler = DeviceEventEmitter.addListener(ReactEventListener.LOGIN, (e) => {
                console.log(ReactEventListener.LOGIN, e);
                callback(ReactEventListener,e);
            });
        } else if(event === this.ORDER_FINISH) {
            this.finishOrderHandler = DeviceEventEmitter.addListener(ReactEventListener.ORDER_FINISH, (e) => {
                console.log(ReactEventListener.ORDER_FINISH, e);
                callback(ReactEventListener,e);
            })
            
        } else if(event === this.ORDER_CREATE){
            this.finishOrderHandler = DeviceEventEmitter.addListener(ReactEventListener.ORDER_CREATE, (e) => {
                console.log(ReactEventListener.ORDER_CREATE, e);
                callback(ReactEventListener,e);
            })
        } else if(event === this.GOOGLE_PAY_FINISH) {
            this.googlePayHandler = DeviceEventEmitter.addListener(ReactEventListener.GOOGLE_PAY_FINISH, (e) => {
                console.log(ReactEventListener.GOOGLE_PAY_FINISH, e);
                callback(ReactEventListener,e);
            })
        } else if(event === this.GOOGLE_PLUS_PAY_FINISH) {
            this.finishGoogldPlusPayHandler = DeviceEventEmitter.addListener(ReactEventListener.GOOGLE_PLUS_PAY_FINISH,(e)=>{
                console.log(ReactEventListener.GOOGLE_PLUS_PAY_FINISH, e);
                callback(ReactEventListener,e);
            });
        }
      
    },
    unRegistry(){
        if(event === this.INIT) {
            this.initHandler.remove();
        } else if(event === this.LOGIN){
            this.loginHandler.remove();
        } else if(event === this.ORDER_FINISH) {
            this.finishGoogldPayHandler.remove();
        } else if(event === this.ORDER_CREATE){
            this.createOrderHandler.remove();
        } else if(event === this.GOOGLE_PAY_FINISH) {
            this.googlePayHandler.remove();
        } else if(event === this.GOOGLE_PLUS_PAY_FINISH) {
            this.finishGoogldPlusPayHandler.remove();
        }
    }
}