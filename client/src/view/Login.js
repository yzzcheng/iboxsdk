import React, { Component } from 'react';
import { NativeModules, Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import Apis from '../apis'
import Native from '../apis/native'
import Radio from './components/Radio'
import { componentController } from '../viewState'
import device from './device'
import Styles from './styles/Login'
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

  onGoogleLogin(){
    Native.googleLogin((msg)=>{
      console.log(msg);
    })
  }

  render() {

    return (
      <View style={Styles.contain}>
        <View style={Styles.logo}>
          <Image style={Styles.logoImage} source={device.getAssert('login/MG-logo.png')} />
        </View>
        <View style={Styles.loginPannel}>
          <View style={Styles.loginContain}>
            <View style={{ flexDirection: 'row', height: device.pxTodp(50), alignItems: 'center' }}>
              <View style={Styles.dashLine}></View>
              <Text style={{ textAlign: 'center', color: '#8E9090',fontSize:device.pxTodp(16) }}>请选择登录方式</Text>
              <View style={Styles.dashLine}></View>
            </View>
            <View style={Styles.iconPannel}>
              <View style={Styles.iconItem}>
                <TouchableWithoutFeedback onPress={this.onQuickLogin.bind(this)}>
                  <Image style={Styles.loginIcon} source={device.getAssert('login/guest.png')} />
                </TouchableWithoutFeedback>
                <Text style={Styles.loginText}>Play Now</Text>
              </View>
              <View style={Styles.iconItem}>
                <TouchableWithoutFeedback onPress={this.onPlatformLogin.bind(this)}>
                  <Image style={Styles.loginIcon} source={device.getAssert('login/mg-icon.png')} />
                </TouchableWithoutFeedback>
                <Text style={Styles.loginText}>MG账号</Text>
              </View>
              <View style={Styles.iconItem}>
                <TouchableWithoutFeedback onPress={this.onFacebookLogin.bind(this)}>
                  <Image style={Styles.loginIcon} source={device.getAssert('login/fb-icon.png')} />
                </TouchableWithoutFeedback>
                <Text style={Styles.loginText}>FaceBook</Text>
              </View>
              <View style={Styles.iconItem}>
                <TouchableWithoutFeedback onPress={this.onGoogleLogin.bind(this)}>
                  <Image style={Styles.loginIcon} source={device.getAssert('login/google-icon.png')} />
                </TouchableWithoutFeedback>
                <Text style={Styles.loginText}>Google</Text>
              </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row' }}><Radio label="I have read and agree to the " textStyle={{ color: '#7A7C7D', fontSize: device.pxTodp(16) }} />
                <Text style={{ color: '#2972EC', fontSize: device.pxTodp(16) }}>Terms of Service</Text>
                <Text style={{ color: '#7A7C7D', fontSize: device.pxTodp(16) }}> and </Text>
                <Text style={{ color: '#2972EC', fontSize: device.pxTodp(16) }}>Privacy Policy</Text>
              </View>
            </View>
          </View>
        </View>

      </View>


    );
  }
}