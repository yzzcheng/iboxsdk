import React, { Component } from 'react';
import { View, Text, TextInput, Image,TouchableWithoutFeedback } from 'react-native';
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
        return <View style={{ flexDirection: 'row', borderColor: 'rgb(153, 153, 153)', borderWidth: 1, borderRadius: 3,alignItems:'center',paddingRight:5,paddingLeft:5}}>
            <Image source={leftIcon} />
            <TextInput value={value} style={{ flex: 1,color:'black',height:40 }} placeholder={placeholder} onChangeText={text=>this.setState({value:text})} secureTextEntry={secureTextEntry} placeholderTextColor={placeholderTextColor} textContentType={textContentType} />
            {rightIcon?<TouchableWithoutFeedback onPress={this.onRightIconClick.bind(this)}><Image source={rightIcon} /></TouchableWithoutFeedback>:null}
        </View>
    }
}