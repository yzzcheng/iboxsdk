Native 接口


import { DeviceEventEmitter, NativeModules, Button, View } from 'react-native';
const { ReactEventListener, GoogleService, FaceBookService } = NativeModules;


订阅原生事件
DeviceEventEmitter.addListener(String eventName,(data)->{
    //TODO
})
参数1  eventName  事件名
ReactEventListener.ORDER_CREATE  原生发起下单
ReactEventListener.INIT   原生发起初始化
ReactEventListener.LOGIN  原生发起登录
ReactEventListener.ORDER_FINISH   原生支付成功返回

操作原生方法
ReactEventListener.sendMsgToNative(String eventName,Map data)

参数1  eventName  事件名 
ReactEventListener.LOGIN  登录完成
ReactEventListener.ORDER_FINISH   订单完成返回回调



ReactEventListener.STATUS  原生方法状态  200 成功  其他错误
ReactEventListener.DIALOG_STATUS  RN容器状态  1 显示 0 隐藏



