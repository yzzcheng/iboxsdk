import Base from './Base'

export default class Context extends Base {
    getAppId(callback){
        let key = super.buildKey('context','appId');
        super.getData(key,callback);
    }
}