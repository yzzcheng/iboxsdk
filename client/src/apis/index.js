

import { NativeModules } from 'react-native';
const { IBoxEnvironment } = NativeModules;
const apiUrl = "http://sg-platsdk.mythsgame.net/u9games";



const objectToUrlParam = function(params){
    var urlParams = "";
    for(let name in params){
        urlParams+="&"+name+"="+params[name];
    }
    return urlParams.substring(1);
}

const httpTools = {
    httpPost:function(url,params){
        console.log("POST "+url+ ": "+ objectToUrlParam(params));
        return fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: objectToUrlParam(params),
          })
    }
}

export default {
    init:function(params){
      return new Promise((resolve,reject)=>{
        const url = apiUrl + "/v2/user/init";
        IBoxEnvironment.sign(params,data=>{
          httpTools.httpPost(url,data).then(res=>{
            resolve(res.json());
          }).catch(e=>{
              reject(e)
          });
        })
      })
    }
};