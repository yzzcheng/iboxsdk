import {AsyncStorage} from 'react-native';
import Native from '../apis/native'
export default class LocalStore {
    buildKey(keyArr){
        return keyArr.join(",");
    }

    getData(key,callback){
        AsyncStorage.getItem(key,callback);
    }


    setData(key,value,callback){
        AsyncStorage.setItem(key,value,callback);
    }

    fromNative(key,callback){
        Native.getAppEnv(key,callback);
    }

}
