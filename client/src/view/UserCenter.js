import React, { Component } from 'react';
import { DeviceEventEmitter,NativeModules,Text, View } from 'react-native';

export default class UserCenter extends Component {

    constructor(props){
        super(props);
        this.state = this.initState();
    }

    initState(){
        return {
           
        };
    }

    render() {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>UserCenter</Text>
        </View>
      );
    }
  }