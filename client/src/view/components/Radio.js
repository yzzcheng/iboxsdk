import React, { Component } from 'react';
import { View, Text,TouchableWithoutFeedback } from 'react-native';
import common from '../../res/styles/common'
export default class Radio extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = this.initState(props);
    }
    initState(props) {
        return {
            isCheck: false,
            label:props.label,
            textStyle:props.textStyle
        };
    }

    componentWillReceiveProps(props){
        const {isCheck,label,checkOnChange,textStyle} = props;
        console.log(props)
        this.setState({
            isCheck,
            label,
            checkOnChange,
            textStyle
        });
    }

    checkOnChange(){
        const {isCheck,checkOnChange} = this.state;
        this.setState({isCheck:!isCheck});
        if(checkOnChange) {
            checkOnChange(!isCheck);
        }
    }

    render() {
        const { isCheck,label,textStyle } = this.state;
        return <TouchableWithoutFeedback onPress={this.checkOnChange.bind(this)}><View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={common.radioCircle}>
                {isCheck ? <View style={common.radioInnerCircle}></View> : null}
            </View>
            <Text style={textStyle}>{label}</Text>
        </View></TouchableWithoutFeedback>;
    }
}