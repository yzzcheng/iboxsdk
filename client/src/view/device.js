import {Dimensions} from 'react-native'
const {width,height} =  Dimensions.get('window')
const vDesignSize = {
    width:1334,
    height:750
};

const hDesignSize = {
    height:1334,
    width:750
};

let designSize = vDesignSize;

if(width > height) designSize = vDesignSize;
else designSize = hDesignSize;



export default {
    height:height,
    width:width,
    pxTodp(px){
       return this.width *px/ designSize.width;
    }
}