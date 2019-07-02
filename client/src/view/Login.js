import React, { Component } from 'react';
import { NativeModules, Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import Apis from '../apis'
import Radio from './components/Radio'
import { componentController } from '../viewState'
import device from './device'
const { ReactEventListener, IBoxEnvironment, FaceBookService } = NativeModules;


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = this.initState();
  }

  initState() {
    return {
      userName: '',
      password: ''
    };
  }

  login() {
    // ReactEventListener.sendMsgToNative(ReactEventListener.CLOSE_SDK, {
    //   [ReactEventListener.STATUS]: 200,
    //   [ReactEventListener.DIALOG_STATUS]: 0,
    // });
    console.log()
    const { userName } = this.state;
    ReactEventListener.sendMsgToNative(ReactEventListener.LOGIN, {
      [ReactEventListener.STATUS]: 200,
      [ReactEventListener.DIALOG_STATUS]: 0,
      userName: userName,
      userId: 123,
      token: '124325325'
    });
  }

  getEnv() {
    Apis.init({
      appId: "10014",
      packageId: "11",
    }).then(res => {
      console.log(res);
    })
  }

  onFacebookLogin() {
    FaceBookService.doLogin((res) => {
      console.log(res)
    })
  }

  onQuickLogin() {
    componentController.changeView('quickLoginTip');
  }

  onPlatformLogin() {
    componentController.changeView('platformLogin');
  }

  render() {
    const styles = {
      dashLine: { borderColor: 'black', borderStyle: 'dashed', borderWidth: 0.5, flex: 1, height: 0, borderRadius: 1 }
    };

    return (
      <View style={{ width: device.pxTodp(350), height: device.pxTodp(290), flexDirection: 'column' }}>
        <View style={{ justifyContent: 'center', height: device.pxTodp(50), alignItems: 'center' }}>
          <Image source={require('../res/img/logo.png')} style={{ alignSelf: 'center' }} />
        </View>

        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
          <View style={styles.dashLine}></View>
          <Text style={{ textAlign: 'center', color: '#8E9090' }}>请选择登录方式</Text>
          <View style={styles.dashLine}></View>
        </View>
        <View style={{ flexDirection: 'row', height: device.pxTodp(140) }}>
          <View style={{ flex: 1, alignItems: 'center',justifyContent:'center' }}>
            <TouchableWithoutFeedback onPress={this.onQuickLogin.bind(this)}>
              <Image style={{ width: device.pxTodp(70), height: device.pxTodp(70) }} source={require('../res/img/guest.png')} />
            </TouchableWithoutFeedback>
            <Text style={{ textAlign: 'center', color: '#8E9090' }}>立即体验</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center',justifyContent:'center' }}>
            <TouchableWithoutFeedback onPress={this.onPlatformLogin.bind(this)}>
              <Image style={{ width: device.pxTodp(70), height: device.pxTodp(70) }} source={require('../res/img/platform.png')} />
            </TouchableWithoutFeedback>
            <Text style={{ textAlign: 'center', color: '#8E9090' }}>MG账号</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center',justifyContent:'center' }}>
            <TouchableWithoutFeedback onPress={this.onFacebookLogin.bind(this)}>
              <Image style={{ width: device.pxTodp(70), height: device.pxTodp(70) }} source={require('../res/img/facebook.png')} />
            </TouchableWithoutFeedback>
            <Text style={{ textAlign: 'center', color: '#8E9090' }}>FaceBook</Text>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row' }}><Radio label="我已阅读并同意" textStyle={{ color: '#8E9090' }} /><Text style={{ color: 'red' }}>用户服务协议</Text></View>
        </View>
      </View>


    );
  }
}