import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import device from '../device';
import Native from '../../apis/native'

export default class SDKBox extends Component {

    back() {
        const { back } = this.props;
        if (back) {
            back();
        }
    }

    close() {
        const { close } = this.props;
        Native.hide();
        if (close) {
            close();
        }
    }

    render() {
        const { style, title, children } = this.props;
        return <View style={style}>
            <View style={{ backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#E8E8E8' }}>
                <View style={{ height: device.pxTodp(100), paddingLeft: device.pxTodp(50), paddingRight: device.pxTodp(50), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableWithoutFeedback onPress={this.back.bind(this)}>
                            <Image style={{ width: device.pxTodp(40), height: device.pxTodp(40) }} source={device.getAssert('return.png')} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ flex: 1 }}><Text style={{ textAlign: 'center', color: '#38383F' }}>{title}</Text></View>
                    <TouchableWithoutFeedback onPressIn={this.close.bind(this)}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                            <Image style={{ width: device.pxTodp(40), height: device.pxTodp(40) }} source={device.getAssert('close.png')} />

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>{children}</View>
        </View>;
    }
}