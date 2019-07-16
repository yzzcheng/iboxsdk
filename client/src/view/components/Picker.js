import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableWithoutFeedback, Modal } from 'react-native';
import device from '../device'
import SDKButton from './Button'
import Common, { extendStyle } from '../../res/styles/common_v2'

export default class Picker extends Component {

    constructor(props) {
        super(props);
        this.state = this.initState(props);
    }

    componentWillReceiveProps(props) {
        const { visible } = props;
        if (visible != undefined) {
            this.setState({
                visible: visible
            })
        }
    }

    initState(props) {
        return {
            visible: props.visible ? props.visible : false
        };
    }

    componentWillUnmount() {
        this.setState({
            visible: false
        })
    }

    close() {
        this.setState({
            visible: false
        })
    }

    show() {
        this.setState({
            visible: true
        })
    }

    render() {
        const { visible } = this.state;
        const { style, children, lable } = this.props;
        return <View style={extendStyle({ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }, style)}>
            <TouchableWithoutFeedback onPress={this.show.bind(this)}>
                <View style={{ alignItems: 'center', justifyContent: 'center',flexDirection:'row' }} >
                    <Text style={{ color: 'black' }}>{lable}</Text>
                    <Image style={{ height: device.pxTodp(12), width: device.pxTodp(12) }} source={device.getAssertV2('array-down.png')} />
                </View>
            </TouchableWithoutFeedback>
            <Modal transparent={true} visible={visible}>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '50%', height: '50%', backgroundColor: 'white' }}>
                        <View style={{ flex: 1 }}>
                            {children}
                        </View>
                        <View>
                            <SDKButton textStyle={{ color: 'black' }} onPress={this.close.bind(this)}>关闭</SDKButton>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    }
}