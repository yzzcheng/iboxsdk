import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Native from '../../apis/native'
export default class Loading extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.timer = setTimeout(()=>{
            Native.dispatcherEvent(Native.LOGIN,200,0,{
                userId:123,
                userName:"linlin.zhang",
                token:'ejioewjrowjeiojeorjiw'
            });
        },3000);
    }
    componentWillUnmount(){
        clearTimeout(this.timer)
    }

    render(){
        return <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:100}}>
            <Image source={require('../../res/img/loading.gif' )} style={{width:50,height:50}}></Image>
            <Text style={{color:'#8E9090'}}>正在登录...</Text>
        </View>;
    }
}