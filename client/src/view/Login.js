import React, { Component } from 'react';
import { DeviceEventEmitter, NativeModules, Text, View,TextInput } from 'react-native';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = this.initState();
  }

  initState() {
    return {
      userName:'',
    };
  }

  render() {
    return (
      <View style={{ width:300,flexDirection:'column' }}>
        <Text>Login</Text>
        <TextInput
          placeholder="UserName"
          onChangeText={(text) => this.setState({ userName:text })}
        />
      </View>
    );
  }
}