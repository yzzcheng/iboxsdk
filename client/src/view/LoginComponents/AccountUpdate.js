import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Button } from 'react-native';
import InputArea from '../components/InputArea'
import SDKBox from '../components/SDKBox'
import IBoxButton from '../components/Button'
import { componentController } from '../../viewState'
import Native from '../../apis/native'
import device from '../device'
import Styles from './styles/AccountUpdate'
export default class AccountUpdate extends Component {
    constructor(props) {
        super(props);
    }

    back() {
        componentController.changeView('login');
    }
    onUpdate() {

    }

    onFacebookLogin() {
        Native.facebookLogin((userinfo) => {
            console.log(userinfo);
        });
    }


    render() {
        return <SDKBox title="账号升级" style={Styles.contain} back={this.back.bind(this)}>
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <View style={Styles.loginContain}>
                    <View style={Styles.formItem}>
                        <InputArea placeholder="请输入您的账号" placeholderTextColor="#D4D4D4" leftIcon={device.getAssert('platformlogin/user.png')} />
                    </View>
                    <View style={Styles.formItem}>
                        <InputArea placeholder="请输入您的密码" secureTextEntry placeholderTextColor="#D4D4D4" leftIcon={device.getAssert('platformlogin/password.png')} />
                    </View>
                    <View style={Styles.formItem}>
                        <InputArea placeholder="请输入您的密码" secureTextEntry placeholderTextColor="#D4D4D4" leftIcon={device.getAssert('platformlogin/password.png')} />
                    </View>
                    <View style={Styles.formItem}>
                        <IBoxButton text="升级" style={Styles.loginBtn} textStyle={Styles.loginBtnText} />
                    </View>

                    <View style={Styles.formItem}>
                        <IBoxButton text="facebook" style={Styles.facebookBtn} textStyle={Styles.facebookBtnText} />
                    </View>
                </View>

            </View>

        </SDKBox>
    }
}