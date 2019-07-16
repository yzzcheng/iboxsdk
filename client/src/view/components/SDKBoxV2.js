import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import device from '../device';
import Native from '../../apis/native'
import Common, { extendStyle } from '../../res/styles/common_v2.js'

export default class SDKBoxV2 extends Component {

    back() {
        const { back } = this.props;
        if (back) {
            back();
        }
    }

    close() {
        const { close } = this.props;
        if (close) {
            close();
        }
        Native.hide();
    }

    render() {
        const { style, title, children } = this.props;
        return <View style={extendStyle({flex:1},style)}>
            <View style={{ height: device.pxTodp(40), backgroundColor: 'rgb(84,168,247)', alignItems: 'center', justifyContent: 'center', shadowColor: '#E8E8E8' }}>
                <View style={{ height: device.pxTodp(30), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', width: device.pxTodp(30), justifyContent: 'center' }}>
                        <TouchableWithoutFeedback onPressIn={this.back.bind(this)}>
                            <Image style={{ width: device.pxTodp(16), height: device.pxTodp(16) }} source={device.getAssertV2('back.png')} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ flex: 1 }}><Text style={extendStyle({ textAlign: 'center', color: 'white' }, { fontSize: device.pxTodp(14) })}>{title}</Text></View>

                    <View style={{ alignItems: 'center', width: device.pxTodp(30), justifyContent: 'center' }}>
                        <TouchableWithoutFeedback onPressIn={this.close.bind(this)}>
                            <Image style={{ width: device.pxTodp(16), height: device.pxTodp(16) }} source={device.getAssertV2('close.png')} />
                        </TouchableWithoutFeedback>
                    </View>

                </View>
            </View>

            <View style={extendStyle({ flex: 1 })}>{children}</View>
        </View>;
    }
}