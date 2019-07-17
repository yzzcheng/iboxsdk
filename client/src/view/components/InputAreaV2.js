import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import device from '../device'
import Common, { extendStyle } from '../../res/styles/common_v2'

export default class InputField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    onRightIconClick() {
        const { onRightClick } = this.props;
        const { value } = this.state;
        if (onRightClick) onRightClick(value);
    }

    render() {
        const { value } = this.state;
        const { placeholder, placeholderTextColor, textContentType, secureTextEntry, leftIcon, rightIcon, style } = this.props;
        return <View style={extendStyle({ flexDirection: 'row', alignItems: 'center' }, style)}>
            {leftIcon ? <Image style={extendStyle({ width: device.pxTodp(24), height: device.pxTodp(24) }, Common.margin_right_min)} source={leftIcon} /> : null}
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderColor: '#cdcdcd', borderWidth: device.dpTopx(1), borderStyle: 'solid', height: device.pxTodp(30) }}>
                <TextInput value={value} style={extendStyle(Common.margin_left_min, { flex: 1, color: '#1B1B1B', height: device.pxTodp(30), fontSize: device.pxTodp(12), paddingVertical: 0 })} placeholder={placeholder} onChangeText={text => this.setState({ value: text })} secureTextEntry={secureTextEntry} placeholderTextColor={placeholderTextColor} textContentType={textContentType} />
                {rightIcon ? <TouchableWithoutFeedback onPress={this.onRightIconClick.bind(this)}><Image style={extendStyle({ width: device.pxTodp(14), height: device.pxTodp(14) }, Common.margin_right_min)} source={rightIcon} /></TouchableWithoutFeedback> : null}
            </View>
        </View>
    }
}