import {AsyncStorage} from 'react-native';

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

}
