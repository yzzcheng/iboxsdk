import { StyleSheet } from 'react-native';
import device from '../device';

export default StyleSheet.create({
    contain:{ height: device.pxTodp(670), width: device.pxTodp(730) },
    userContain:{ paddingLeft: device.pxTodp(100), paddingRight: device.pxTodp(100), paddingTop: device.pxTodp(60), flexDirection: 'column' },
    actionContain:{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    actionItem:{flex:1,justifyContent: 'center', alignItems: 'center'},
    actionIcon:{ height: device.pxTodp(80), width: device.pxTodp(80) },
    actionText:{ color: '#525252',textAlign:'center',fontSize:device.pxTodp(25) }
})