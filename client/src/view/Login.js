import React, { Component } from 'react';
import { DeviceEventEmitter, NativeModules, Button, Text, View, TextInput } from 'react-native';
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
    ReactEventListener.sendMsgToNative(ReactEventListener.LOGIN, {
      [ReactEventListener.STATUS]: 200,
      [ReactEventListener.DIALOG_STATUS]: 0,
      userName: 'linlin.zhang',
      userId: 123,
      token: '124325325'
    });
  }

  getEnv(){
    IBoxEnvironment.getEnv(IBoxEnvironment.GPS_ID,(data)=>{
      console.log(data);
    });
  }

  render() {
    return (
      <View style={{ width: 300, height: 400, flexDirection: 'column' }}>
        <Text style={{ textAlign: 'center' }}>Login</Text>
        <TextInput
          placeholder="UserName"
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
    );
  }
}