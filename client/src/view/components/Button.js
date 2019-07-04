import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableWithoutFeedback } from 'react-native';


export default class IBoxButton extends Component {


    onPress(e){
        const {onPress} = this.props;
        if(onPress){
            onPress(e);
        }
    }

    render() {
        const { style, text, textStyle } = this.props;
        return <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
            <View style={style}>
                <Text style={textStyle}>{text}</Text>
            </View>
        </TouchableWithoutFeedback>;
    }
}