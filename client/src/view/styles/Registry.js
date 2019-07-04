import { StyleSheet } from 'react-native';
import device from '../device';

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
        height:device.pxTodp(320),
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
        textAlign:'center'
    },
})