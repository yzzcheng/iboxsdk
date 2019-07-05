import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback,Clipboard,Alert } from 'react-native';
import SDKBox from './components/SDKBox'
import IBoxButton from './components/Button'
import device from './device'
import API from '../apis'
import { componentController } from '../viewState'
import Styles from './styles/UserCenter'
export default class UserCenter extends Component {

  constructor(props) {
    super(props);
    this.state = this.initState();
  }

  initState() {
    return {
      device_no:'unknow'
    };
  }

  componentWillMount(){
    API.getContext((ctx)=>{
      console.log(ctx);
      this.setState({
        device_no:ctx.GPS_ID
      })
    })
  }

  back() {
    componentController.changeView('login');
  }

  copy(){
    Clipboard.setString(this.state.device_no);
    Alert.alert('复制成功！');
  }

  changeView(view){
    componentController.changeView(view);
  }

  render() {
    return (
      <SDKBox style={Styles.contain} title="个人中心" back={this.back.bind(this)}>
        <View style={Styles.userContain}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Image source={require('../res/img/usercenter/use-icon.png')} style={{ width: device.pxTodp(95), height: device.pxTodp(100) }} />
            </View>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginLeft: device.pxTodp(10) }}>
              <Text style={{ color: '#525252' }}>ID_324973289479328473243252</Text>
              <Text style={{ color: '#8B8B8B' }} >UUID</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={{ color: '#8B8B8B', flex: 1 }}>{this.state.device_no}</Text>
                <IBoxButton onPress={this.copy.bind(this)} style={{ borderColor: '#8B8B8B', borderWidth: 0.5, borderRadius: 5, width: device.pxTodp(80), height: device.pxTodp(35) }} text="复制" textStyle={{ color: '#8B8B8B', textAlign: 'center' }} />
              </View>
            </View>

          </View>
          <View style={{ borderBottomColor: '#8B8B8B', borderBottomWidth: 1, marginTop: device.pxTodp(50), marginBottom: device.pxTodp(50) }}></View>

          <View style={Styles.actionContain}>
            <View style={Styles.actionItem}>
              <TouchableWithoutFeedback onPress={this.changeView.bind(this,'login')}>
                <Image style={{ height: device.pxTodp(80), width: device.pxTodp(80) }} source={require('../res/img/usercenter/i-1.png')} />
              </TouchableWithoutFeedback>
              <Text style={{ color: '#525252',textAlign:'center' }} >充值记录</Text>
            </View>

            <View style={Styles.actionItem}>
              <TouchableWithoutFeedback onPress={this.changeView.bind(this,'login')}>
                <Image style={Styles.actionIcon} source={require('../res/img/usercenter/i-2.png')} />
              </TouchableWithoutFeedback>
              <Text style={Styles.actionText} >联系客服</Text>
            </View>
            <View style={Styles.actionItem}>
              <TouchableWithoutFeedback onPress={this.changeView.bind(this,'login')}>
                <Image style={Styles.actionIcon} source={require('../res/img/usercenter/i-3.png')} />
              </TouchableWithoutFeedback>
              <Text style={Styles.actionText} >帮助中心</Text>
            </View>
            <View style={Styles.actionItem}>
              <TouchableWithoutFeedback onPress={this.changeView.bind(this,'login')}>
                <Image style={Styles.actionIcon} source={require('../res/img/usercenter/i-4.png')} />
              </TouchableWithoutFeedback>
              <Text style={Styles.actionText} >切换账号</Text>
            </View>
          </View>
        </View>
      </SDKBox>
    );
  }
}