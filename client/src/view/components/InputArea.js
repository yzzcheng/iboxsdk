import React, { Component } from 'react';
import { View, Text, TextInput, Image,TouchableWithoutFeedback } from 'react-native';
import device from '../device'
export default class InputField extends Component {

    constructor(props){
        super(props);
        this.state = {
            value:props.value
        };
    }

    onRightIconClick(){
        const {onRightClick} = this.props;
        const {value} = this.state;
        if(onRightClick) onRightClick(value);
    }

    render() {
        const {value} = this.state;
        const {placeholder,placeholderTextColor,textContentType,secureTextEntry,leftIcon,rightIcon} = this.props;
        return <View style={{ flexDirection: 'row', borderColor: 'rgb(153, 153, 153)', borderWidth: 0.5, borderRadius: 3,alignItems:'center',paddingRight:5,paddingLeft:5}}>
            <Image style={{width:device.pxTodp(24),height:device.pxTodp(29)}} source={leftIcon} />
            <Text style={{color:'#D4D4D4',marginLeft:device.pxTodp(5),marginRight:device.pxTodp(5)}}>|</Text>
            <TextInput value={value} style={{ flex: 1,color:'black',height:device.pxTodp(60),fontSize:device.pxTodp(14) }} placeholder={placeholder} onChangeText={text=>this.setState({value:text})} secureTextEntry={secureTextEntry} placeholderTextColor={placeholderTextColor} textContentType={textContentType} />
            {rightIcon?<TouchableWithoutFeedback onPress={this.onRightIconClick.bind(this)}><Image style={{width:device.pxTodp(24),height:device.pxTodp(29)}} source={rightIcon} /></TouchableWithoutFeedback>:null}
        </View>
    }
}