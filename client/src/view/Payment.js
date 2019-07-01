import React, { Component } from 'react';
import { DeviceEventEmitter, NativeModules, Button, Text, View, TextInput,ImageBackground } from 'react-native';
import Common from '../res/styles/common'
const { ReactEventListener, GoogleService, FaceBookService } = NativeModules;


export default class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return {
            productId: 'product_0.99_xmyxwno1',
            plusName: 'com.bdgames.xmyxwno1://pluspay'
        };
    }

    doPay() {
        // ReactEventListener.sendMsgToNative(ReactEventListener.CLOSE_SDK, {
        //   [ReactEventListener.STATUS]: 200,
        //   [ReactEventListener.DIALOG_STATUS]: 0,
        // });
        // GoogleService.startPayment(orderinfo.productName);
        const { productId, plusName } = this.state;
        console.log(this.state);
        GoogleService.startPlusPayment(productId, plusName);
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
        const { productId, plusName } = this.state;
        return (
            <View style={{ width: 300, height: 200, flexDirection: 'column', alignItems: 'center' }}>
                <ImageBackground source={{
                    uri: 'http://p1.ifengimg.com/fck/2017_02/80a0062fea96871_w640_h349.jpg',
                    cache: 'only-if-cached'
                }} style={Common.LoginView}>
                    <Text style={{ textAlign: 'center' }}>支付</Text>
                    <TextInput
                        placeholder="商品ID"
                        value={productId}
                        onChangeText={(text) => this.setState({ productId: text })}
                    />
                    <TextInput
                        placeholder="插件信息"
                        value={plusName}
                        onChangeText={(text) => this.setState({ plusName: text })}
                    />
                    <View >
                        <Button style={{ textAlign: "center" }} title="拉起插件支付" onPress={this.doPay.bind(this)} />
                        <Button style={{ textAlign: "center" }} title="Cancel" onPress={this.cancel.bind(this)} />
                    </View>
                </ImageBackground>

            </View>
        );
    }
}