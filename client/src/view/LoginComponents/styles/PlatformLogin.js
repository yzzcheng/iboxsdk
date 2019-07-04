import { StyleSheet } from 'react-native';
import device from '../../device';

export default StyleSheet.create({
    contain:{
        width: device.pxTodp(692),
        height: device.pxTodp(652),
        padding: device.pxTodp(15)
    },
    logo:{ 
        justifyContent: 'center', 
        height: device.pxTodp(200), 
        alignItems: 'center'
    },
    logoImage:{
        height: device.pxTodp(105), 
        width: device.pxTodp(337),
       
    },
    loginPannel:{
        marginLeft:device.pxTodp(70), 
        marginRight:device.pxTodp(70), 
        backgroundColor:'#F5F5F5',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    loginContain:{
        padding:device.pxTodp(20),
        width:device.pxTodp(500),
        height:device.pxTodp(300),
        flexDirection:'column',
    },
    formItem:{
        height:device.pxTodp(75),
    },
    loginBtn:{
        backgroundColor:'#FFBE2A',
        borderRadius:device.pxTodp(5),
        height:device.pxTodp(60),
        justifyContent:'center',
        borderColor:'#C09C6A',
        borderWidth:device.pxTodp(0.5)
    },
    loginBtnText:{
        color:'#473100',
        textAlign:'center',
        fontSize:device.pxTodp(16),
    },
    otherBtn:{
        height:device.pxTodp(40),
        borderRadius:device.pxTodp(5),
        justifyContent:'center',
        borderColor:'#939393',
        width:device.pxTodp(150),
        borderWidth:device.pxTodp(1)
    },
    otherBtnText:{
        color:'#473100',
        textAlign:'center',
        fontSize:device.pxTodp(14),
    },
    regPlatformBtn:{
        height:device.pxTodp(40),
        borderRadius:device.pxTodp(5),
        justifyContent:'center',
        borderColor:'#D89101',
        width:device.pxTodp(150),
        borderWidth:1
    },
    regPlatformBtnText:{
        color:'#D89101',
        textAlign:'center',
        fontSize:device.pxTodp(14),
    }

})
