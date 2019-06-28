import React, { Component } from 'react';
import { DeviceEventEmitter, NativeModules, Button, Text, View, TextInput, ImageBackground } from 'react-native';
import Apis from '../apis'
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
    const {userName} = this.state;
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

  render() {
    return (
      <ImageBackground source={{
        uri: 'http://p1.ifengimg.com/fck/2017_02/80a0062fea96871_w640_h349.jpg',
        cache:'only-if-cached'
      }}  style={{width: 300, height: 350}}>
        <View style={{ width: 300, height: 350, flexDirection: 'column',justifyContent:'center' }}>
          <Text style={{ textAlign: 'center' }}>Login</Text>
          <TextInput
            placeholder="UserName"
            style={{ width: 300}}
            onChangeText={(text) => this.setState({ userName: text })}
          />
          <TextInput
            placeholder="Password"
            onChangeText={(text) => this.setState({ password: text })}
          />
          <View >
            <Button style={{ textAlign: "center" }} title="Login" onPress={this.login.bind(this)} />
            <Button style={{ textAlign: "center" }} title="Env" onPress={this.getEnv.bind(this)} />
          </View>
        </View>
      </ImageBackground>

    );
  }
}