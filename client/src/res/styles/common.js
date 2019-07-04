import { StyleSheet } from 'react-native';
import device from '../../view/device';

export default StyleSheet.create({
    contain: {
        width: device.pxTodp(350),
        height: device.pxTodp(250),
        padding: device.pxTodp(15)
    },
    title: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        height: device.pxTodp(40),
    },
    returnBtn: {
        width: device.pxTodp(40),
        height: device.pxTodp(40)
    },
    containTitleText: {
        textAlign: 'center',
        color: 'rgb(51, 51, 51)',
        fontSize: device.pxTodp(18)
    },
    tipContain: {
        flexDirection: "column",
        height: device.pxTodp(100),
        justifyContent: 'center',
        padding: device.pxTodp(20)
    },
    quickTipText: {
        color: 'rgb(51, 51, 51)',
        fontSize: device.pxTodp(14)
    },
    quickTipCheck: {
        flexDirection: "column",
        height: device.pxTodp(30),
        alignItems: 'center',
        justifyContent: 'center',
        padding: device.pxTodp(10)
    },
    quickTipCheckText:{
        color: 'red',
        fontSize: device.pxTodp(14)
    },

    btnGroup:{
        flexDirection: "row", height: device.pxTodp(50), padding: device.pxTodp(20)
    },

    radioCircle:{ 
        borderWidth: device.pxTodp(0.5), 
        borderColor: "rgb(122, 124, 125)", 
        borderRadius: device.pxTodp(10), 
        width: device.pxTodp(14), 
        height: device.pxTodp(14), 
        backgroundColor: 'white', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginRight:device.pxTodp(10) 
    },
    radioInnerCircle:{
        backgroundColor: "rgb(122, 124, 125)", 
        width: device.pxTodp(5), 
        height: device.pxTodp(5), 
        borderRadius: device.pxTodp(6) 
    },

    block:{ 
        paddingLeft: device.pxTodp(20), 
        paddingRight: device.pxTodp(20), 
        paddingTop: device.pxTodp(5), 
        paddingBottom: device.pxTodp(5),
        position:'relative'
    },
    blockCenter:{
        paddingLeft: device.pxTodp(20), 
        paddingRight: device.pxTodp(20), 
        paddingTop: device.pxTodp(5), 
        paddingBottom:device.pxTodp(5), 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    LoginView: {
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "stretch"
    },

})