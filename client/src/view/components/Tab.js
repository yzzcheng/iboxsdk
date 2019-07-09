import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import device from '../device';
const Styles = StyleSheet.create({
    TabHeader: { justifyContent: 'center', padding: device.pxTodp(20), height: device.pxTodp(50) },

    HeaderText: { color: '#303038', fontWeight: 'bold', fontSize: device.pxTodp(20) },
    ActiveHeader: { justifyContent: 'center', padding: device.pxTodp(20), height: device.pxTodp(50), backgroundColor: '#FFFFFF' },
    ActiveText: { color: '#D89101', fontWeight: 'bold', fontSize: device.pxTodp(20) },
    TableContent: { backgroundColor: '#FFFFFF' }
});

export default class IBoxTab extends Component {


    constructor(props) {
        super(props);
        this.state = this.initState(props);
    }

    initState(props) {
        const { items } = props;
        let state = {};
        if (items) {
            let selectIndex = items.findIndex(item => item.isSelected);
            state.selectItem = selectIndex >= 0 ? items[selectIndex] : items[0];
            state.items = items;
        }
        return state;
    }


    componentWillReceiveProps(props) {
        const { items } = props;
        if (items) {
            let selectIndex = items.findIndex(item => item.isSelected);
            let selectItem = selectIndex >= 0 ? items[selectIndex] : items[0];
            this.setState({
                selectItem: selectItem,
                items: items
            })
        }

    }

    selectTable(item) {
        const { selectItem } = this.state;
        if (selectItem.key !== item.key) {
            this.setState({
                selectItem: item
            })
        }

    }

    renderHeader() {
        const { items, selectItem } = this.state;
        if (items) {
            return <View style={{ flexDirection: 'row', height: device.pxTodp(50) }}>
                {
                    items.map(item => {
                        const headerStyle = item.key == selectItem.key ? Styles.ActiveHeader : Styles.TabHeader;
                        const textStyle = item.key == selectItem.key ? Styles.ActiveText : Styles.HeaderText;
                        return <TouchableWithoutFeedback key={item.key} onPress={this.selectTable.bind(this, item)}>
                            <View style={headerStyle}>
                                <Text style={textStyle}>{item.title}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    })
                }
            </View>
        }
        else return null;
    }


    render() {
        const { selectItem } = this.state;
        return <View style={{ flexDirection: 'column',flex:1 }}>
            {this.renderHeader()}
            <View style={{ backgroundColor: '#FFFFFF'}}>
                {selectItem.content}
            </View>
        </View>
    }
}