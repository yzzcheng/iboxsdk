import {Dimensions} from 'react-native'
const {width,height} =  Dimensions.get('window')
const designSize = {
    width:670,
    height:375
};

export default {
    height:height,
    width:width,
    pxTodp(px){
       return this.width *px/ designSize.width;
    }
}