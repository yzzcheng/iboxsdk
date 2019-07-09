import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Native from '../../apis/native'
import device from '../device';
export default class Loading extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.timer = setTimeout(() => {
            Native.dispatcherEvent(Native.LOGIN, 200, 0, {
                userId: 123,
                userName: "linlin.zhang",
                token: 'ejioewjrowjeiojeorjiw'
            });
        }, 3000);
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        const {width,height} = this.props;
        return <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: height }}>
            <Image source={device.getAssert('loading.gif')} style={{ width: device.pxTodp(50), height: device.pxTodp(50) }}></Image>
            <Text style={{ color: '#8E9090' }}>正在登录...</Text>
        </View>;
    }
}