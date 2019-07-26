import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, StyleSheet } from 'react-native';
import InputArea from '../components/InputArea'
import SDKBox from '../components/SDKBox'
import IBoxButton from '../components/Button'
import { componentController } from '../../viewState'
import Native from '../../apis/native'
import device from '../device'
import Common, { extendStyle } from '../../res/styles/common_v2'

const Styles = StyleSheet.create({
    channelItem: extendStyle(Common.margin_right_min, Common.margin_bottom_min, Common.border_normal, Common.flex_center, { width: device.pxTodp(120), height: device.pxTodp(40), flexDirection: 'row' }),
    channelActive: { borderColor: '#3588ef' },
    cardItem: extendStyle(Common.margin_right_min, Common.margin_bottom_min, Common.border_normal, Common.flex_center, { width: device.pxTodp(120), height: device.pxTodp(60), flexDirection: 'column' }),
});


export default class CardList extends Component {



    constructor(props){
        super(props);
        this.state = this.initState();
    }


    initState(){
        return {
            
        };
    }


    close() {
        const { close } = this.props;
        if (close) {
            close();
        }
        Native.hide();
    }

    selectChannel(selectedItem) {

    }

    renderChannleItem(item, isActive) {

        return <TouchableWithoutFeedback onPress={this.selectChannel.bind(this, item)}>
            <View style={isActive ? extendStyle(Styles.channelItem, Styles.channelActive) : Styles.channelItem}>
                <Text style={extendStyle(Common.text_content,{ color: '#000000' })}>{item.name}</Text>
                {item.discount ? <View style={extendStyle(Common.text_content,{ backgroundColor: '#ff6d00' })}><Text>+10%</Text></View> : null}
                {isActive ? <Image style={{ position: 'absolute', top: 0, right: 0, width: device.pxTodp(28), height: device.pxTodp(28) }} source={device.getAssertV2('select.png')} /> : null}

            </View>
        </TouchableWithoutFeedback>;
    }

    renderCardItem(item, isActive) {
        return <TouchableWithoutFeedback onPress={this.selectChannel.bind(this, item)}>
            <View style={isActive ? extendStyle(Styles.cardItem, Styles.channelActive) : Styles.cardItem}>
                <Text style={extendStyle(Common.text_content,{ color: '#000000' })}>{item.name}</Text>
                <View>
                    <Text style={Common.text_tip}>{item.amount}</Text>
                </View>
                {isActive ? <Image style={{ position: 'absolute', top: 0, right: 0, width: device.pxTodp(28), height: device.pxTodp(28) }} source={device.getAssertV2('select.png')} /> : null}

            </View>
        </TouchableWithoutFeedback>;
    }

    render() {
        return <View style={extendStyle(Common.margin_20, { flex: 1 })}>
            <View style={extendStyle(Common.margin_bottom_min, { height: device.pxTodp(20), flexDirection: 'row' })}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#000000', fontWeight: 'bold' }}>选择支付方式</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: device.pxTodp(20) }}>
                    <TouchableWithoutFeedback onPressIn={this.close.bind(this)}>
                        <Image style={{ width: device.pxTodp(20), height: device.pxTodp(20) }} source={device.getAssertV2('close-gray.png')} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={extendStyle(Common.margin_bottom_min)}>
                <Text style={extendStyle(Common.margin_bottom_min, Common.text_tip)}>支付方式</Text>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                    {this.renderChannleItem({ name: '点卡' }, true)}
                    {this.renderChannleItem({ name: 'BluePay点卡' }, false)}
                </View>

            </View>
            <View style={extendStyle(Common.margin_bottom_20)}>
                <Text style={extendStyle(Common.margin_bottom_min, Common.text_tip)}>选择档位</Text>
                <View style={{ height:device.pxTodp(60) }}>
                    <ScrollView horizontal={true}>
                            {this.renderCardItem({ name: '5000', amount: '50元' }, true)}
                            {this.renderCardItem({ name: '10000', amount: '100元' }, false)}
                            {this.renderCardItem({ name: '20000', amount: '200元' }, false)}
                            {this.renderCardItem({ name: '50000', amount: '300元' }, false)}
                    </ScrollView>
                </View>
            </View>
            <IBoxButton style={{backgroundColor:'#56a9f7',height:device.pxTodp(40)}}>去充值</IBoxButton>
        </View>
    }
}