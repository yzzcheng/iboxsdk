import { StyleSheet } from 'react-native';
import device from '../../view/device';

export const extendStyle = function () {

    let newStyle = {};
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i]) {
            for (var property in arguments[i]) {
                newStyle[property] = arguments[i][property]
            }
        }

    }
    console.log(newStyle);
    return newStyle;
}

export default StyleSheet.create({
    text_banner: {
        fontSize: device.pxTodp(50),
        height: device.pxTodp(75),
        lineHeight: device.pxTodp(75),
    },
    text_title: {
        fontSize: device.pxTodp(30),
        height: device.pxTodp(45),
        lineHeight:device.pxTodp(45),
    },
    text_content: {
        fontSize: device.pxTodp(14),
        height: device.pxTodp(21),
        lineHeight:device.pxTodp(21),
    },
    text_tip: {
        fontSize: device.pxTodp(12),
        height: device.pxTodp(18),
        lineHeight:device.pxTodp(18),
    },
    flex_center:{
        justifyContent: 'center',
        alignItems: 'center' 
    },
    margin_min: {
        margin: device.pxTodp(10),
    },
    margin_left_min: {
        marginLeft: device.pxTodp(10),
    },
    margin_right_min: {
        marginRight: device.pxTodp(10),
    },
    margin_top_min: {
        marginTop: device.pxTodp(10),
    },
    margin_bottom_min: {
        marginBottom: device.pxTodp(10),
    },
    margin_20: {
        margin: device.pxTodp(20),
    },
    margin_left_20: {
        marginLeft: device.pxTodp(20),
    },
    margin_right_20: {
        marginRight: device.pxTodp(20),
    },
    margin_top_20: {
        marginTop: device.pxTodp(20),
    },
    margin_bottom_20: {
        marginBottom: device.pxTodp(20),
    },
    margin_30: {
        margin: device.pxTodp(30),
    },
    margin_left_30: {
        marginLeft: device.pxTodp(30),
    },
    margin_right_30: {
        marginRight: device.pxTodp(30),
    },
    margin_top_30: {
        marginTop: device.pxTodp(30),
    },
    margin_bottom_30: {
        marginBottom: device.pxTodp(30),
    },
    margin_40: {
        margin: device.pxTodp(40),
    },
    margin_left_40: {
        marginLeft: device.pxTodp(40),
    },
    margin_right_40: {
        marginRight: device.pxTodp(40),
    },
    margin_top_40: {
        marginTop: device.pxTodp(40),
    },
    margin_bottom_40: {
        marginBottom: device.pxTodp(40),
    },
    margin_max: {
        margin: device.pxTodp(50),
    },
    margin_left_max: {
        marginLeft: device.pxTodp(50),
    },
    margin_right_max: {
        marginRight: device.pxTodp(50),
    },
    margin_top_max: {
        marginTop: device.pxTodp(50),
    },
    margin_bottom_max: {
        marginBottom: device.pxTodp(50),
    },
});