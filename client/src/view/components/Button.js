import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import { extendStyle } from '../../res/styles/common_v2'

export default class IBoxButton extends Component {


    onPress(e) {
        const { onPress } = this.props;
        if (onPress) {
            onPress(e);
        }
    }

    render() {
        const { style, text, textStyle } = this.props;
        return <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
            <View style={extendStyle({ justifyContent: 'center', alignItems: 'center' }, style)}>
                <Text style={extendStyle({ textAlign: 'center' }, textStyle)}>{text}</Text>
            </View>
        </TouchableWithoutFeedback>;
    }
}