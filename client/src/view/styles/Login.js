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
        height:device.pxTodp(290),
        justifyContent: 'center', 
        flexDirection:'column',
        alignItems: 'center'
    },

    iconPannel:{
         flexDirection: 'row', 
         height: device.pxTodp(150) 
    },
    iconItem:{ flex: 1, alignItems: 'center', justifyContent: 'center' },
    
    loginIcon:{ 
        width: device.pxTodp(100), 
        height: device.pxTodp(110)
    },
    loginText:{ textAlign: 'center', color: '#8E9090',fontSize:device.pxTodp(14) },
    dashLine: { borderColor: 'black', borderStyle: 'dashed', borderWidth: 0.5, flex: 1, height: 0, borderRadius: 1 }
    
});