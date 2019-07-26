import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Button, StyleSheet } from 'react-native';
import InputArea from '../components/InputArea'
import SDKBox from '../components/SDKBox'
import IBoxButton from '../components/Button'
import { componentController } from '../../viewState'
import Native from '../../apis/native'
import device from '../device'
import Common, { extendStyle } from '../../res/styles/common_v2'

const Styles = StyleSheet.create({
    channelItem: extendStyle(Common.margin_right_min, Common.margin_bottom_min, Common.border_normal, Common.flex_center, { width: device.pxTodp(120), height: device.pxTodp(40), flexDirection: 'row' }),
    channelActive: { borderColor: '#3588ef' }
});


export default class ChannelListV2 extends Component {

    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return {
            currentChannel: 100
        };
    }

    close() {
        const { close } = this.props;
        if (close) {
            close();
        }
        Native.hide();
    }

    cardPay() {
        componentController.changeView('cardList');
    }

    selectChannel(selectedItem) {
        this.setState({
            currentChannel: selectedItem.id
        })
    }

    renderChannleItem(item) {
        const { currentChannel } = this.state;
        const isActive = currentChannel == item.id;
        return <TouchableWithoutFeedback onPress={this.selectChannel.bind(this, item)}>
            <View style={isActive ? extendStyle(Styles.channelItem, Styles.channelActive) : Styles.channelItem}>
                <Text style={extendStyle(Common.text_content, { color: '#000000' })}>{item.name}</Text>
                {item.discount ? <View style={extendStyle(Common.text_tip, { backgroundColor: '#ff6d00' })}><Text style={extendStyle(Common.text_tip, { color: 'white' })}>+10%</Text></View> : null}
                {isActive ? <Image style={{ position: 'absolute', top: 0, right: 0, width: device.pxTodp(28), height: device.pxTodp(28) }} source={device.getAssertV2('select.png')} /> : null}

            </View>
        </TouchableWithoutFeedback>;
    }

    render() {

        return <View style={extendStyle(Common.margin_20, { flex: 1 })}>
            <View style={extendStyle(Common.margin_bottom_min, { height: device.pxTodp(20), flexDirection: 'row' })}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={extendStyle(Common.text_content, { color: '#000000', fontWeight: 'bold' })}>选择支付方式</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: device.pxTodp(20) }}>
                    <TouchableWithoutFeedback onPressIn={this.close.bind(this)}>
                        <Image style={{ width: device.pxTodp(20), height: device.pxTodp(20) }} source={device.getAssertV2('close-gray.png')} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={extendStyle(Common.margin_bottom_min, { flexDirection: 'row', alignItems: 'center' })}>
                <Image style={extendStyle(Common.margin_right_min, { width: device.pxTodp(35), height: device.pxTodp(30) })} source={device.getAssertV2('icon-diamond.png')} />
                <Text style={extendStyle(Common.text_content, { color: '#000000', fontWeight: 'bold' })}>600钻-超级大礼包</Text>
            </View>
            <View style={extendStyle(Common.margin_bottom_min, { flexDirection: 'row' })}>
                {this.renderChannleItem({ name: 'AppStore', id: 100 })}
                {this.renderChannleItem({ name: 'GooglePlay', id: 101 })}
            </View>
            <View style={extendStyle(Common.margin_bottom_min)}>
                <Text style={Common.text_tip}>选择一下支付方式，将有机会获得额外奖励</Text>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                    {this.renderChannleItem({ name: '信用卡', discount: '+10%', id: 102 })}
                    {this.renderChannleItem({ name: 'PayPal', discount: '+10%', id: 103 })}
                    {this.renderChannleItem({ name: 'AppStore', discount: '+10%', id: 104 })}
                    {this.renderChannleItem({ name: 'AppStore', discount: '+10%', id: 105 })}
                </View>

            </View>
            <View style={{ justifyContent: 'center' }}>
                <Text style={extendStyle(Common.text_content, { alignSelf: 'flex-end', color: '#ff6f03' })} onPress={this.cardPay.bind(this)}>点卡渠道商品列表>></Text>
            </View>
        </View>
    }
}