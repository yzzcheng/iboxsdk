import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import { extendStyle } from '../../res/styles/common_v2'
import device from '../device'
export default class IBoxButton extends Component {


    onPress(e) {
        const { onPress } = this.props;
        if (onPress) {
            onPress(e);
        }
    }

    render() {
        const { style, text, textStyle, icon,children } = this.props;
        return <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
            <View style={extendStyle({ justifyContent: 'center', alignItems: 'center',flexDirection:'row' }, style)}>
                {icon?<Image style={{ width: device.pxTodp(14), height: device.pxTodp(14) }} source={icon} />: null}
                <Text style={extendStyle({ textAlign: 'center' }, textStyle)}>{text?text:children}</Text>
            </View>
        </TouchableWithoutFeedback>;
    }
}