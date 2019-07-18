import React, { Component } from 'react';
import { requireNativeComponent, View,WebView } from 'react-native';


export default class PayChannel extends Component {
    render() {
        return  <WebView style={{flex:1}} source={{uri:'http://www.baidu.com'}} />

    }
}