import { StyleSheet } from 'react-native';
import device from '../../device';

export default StyleSheet.create({
    contain: {
        width: device.pxTodp(730),
        height: device.pxTodp(670)
    },
    loginContain: {
        width: device.pxTodp(500),
        padding: device.pxTodp(20),
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        height: device.pxTodp(400),
        marginLeft: device.pxTodp(80),
        marginRight: device.pxTodp(80),
        marginTop: device.pxTodp(30),
        borderRadius: device.pxTodp(5)
    },
    formItem: {
        height: device.pxTodp(75),
    },
    loginBtn: {
        backgroundColor: '#FFBE2A',
        borderRadius: device.pxTodp(5),
        height: device.pxTodp(60),
        justifyContent: 'center',
        borderColor: '#C09C6A',
        borderWidth: device.pxTodp(0.5)
    },
    loginBtnText: {
        color: '#473100',
        textAlign: 'center',
        fontSize: device.pxTodp(30),
        backgroundColor: '#FFBE2A'
    },
    facebookBtn: {
        backgroundColor: '#3B5999',
        borderRadius: device.pxTodp(5),
        height: device.pxTodp(60),
        justifyContent: 'center',
        borderColor: '#C09C6A',
        borderWidth: device.pxTodp(0.5),
    },
    facebookBtnText: {
        color: '#FCFCFB',
        textAlign: 'center',
        fontSize: device.pxTodp(35),
    },
})
