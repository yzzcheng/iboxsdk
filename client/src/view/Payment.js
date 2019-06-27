import React, { Component } from 'react';
import { DeviceEventEmitter, NativeModules, Button, Text, View, TextInput } from 'react-native';
const { ReactEventListener, GoogleService, FaceBookService } = NativeModules;


export default class Payment extends Component {

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

    doPay() {
        // ReactEventListener.sendMsgToNative(ReactEventListener.CLOSE_SDK, {
        //   [ReactEventListener.STATUS]: 200,
        //   [ReactEventListener.DIALOG_STATUS]: 0,
        // });
        // GoogleService.startPayment(orderinfo.productName);
        GoogleService.startPlusPayment('product_0.99_xmyxwno1', "com.bdgames.xmyxwno1://pluspay");
        // ReactEventListener.sendMsgToNative(ReactEventListener.LOGIN, {
        //   [ReactEventListener.STATUS]: 200,
        //   [ReactEventListener.DIALOG_STATUS]: 0,
        //   userName: 'linlin.zhang',
        //   userId: 123,
        //   token: '124325325'
        // });
    }

    cancel() {
        ReactEventListener.sendMsgToNative(ReactEventListener.CLOSE_SDK, {
            [ReactEventListener.STATUS]: 200,
            [ReactEventListener.DIALOG_STATUS]: 0,
        });
    }

    render() {
        return (
            <View style={{ width: 300, height: 400, flexDirection: 'column' }}>
                <Text style={{ textAlign: 'center' }}>支付</Text>
                <TextInput
                    placeholder="UserName"
                    onChangeText={(text) => this.setState({ userName: text })}
                />
                <TextInput
                    placeholder="Password"
                    onChangeText={(text) => this.setState({ password: text })}
                />
                <View >
                    <Button style={{ textAlign: "center" }} title="GoogleOnPlus" onPress={this.doPay.bind(this)} />
                    <Button style={{ textAlign: "center" }} title="Cancel" onPress={this.cancel.bind(this)} />
                </View>
            </View>
        );
    }
}