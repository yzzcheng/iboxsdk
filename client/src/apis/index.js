

import Native from './native';
import DateUtil from '../utils/dateUtils'
const apiUrl = "http://sg-platsdk-test2.mythsgame.net/u9games";



const objectToUrlParam = function (params) {
  var urlParams = "";
  for (let name in params) {
    urlParams += "&" + name + "=" + params[name];
  }
  return urlParams.substring(1);
}



const httpTools = {
  httpPost: function (url, params) {
    console.log("POST " + url + ": " + objectToUrlParam(params));
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: objectToUrlParam(params),
    })
  },
  httpGet: function (url) {
    return fetch(url)
  }
}

let context = {};

const getAppContext = function (callback) {
  if (context.isInit) {
    callback(context);
  } else {
    Native.getAppEnv(data => {
      context = data;
      callback(context);
    })
  }
}

const getIPAddress = function (callback) {
  if (context.ipAddress) {
    callback(200, ipAddress)
  } else {
    httpTools.httpGet("https://ident.me/").then(res => {

      res.text().then((text) => {
        context.ipAddress = text;
        callback(200, text);
      });

    }).catch(e => {
      callback(400, e)
    })
  }
}
export default {
  init: function () {
    return new Promise((resolve, reject) => {
      getAppContext(context => {
        getIPAddress((status, ipAddress) => {
          if (status === 200) {
            Native.sign({
              appId: context.app_id.toString(),
              packageId: context.package_id.toString(),
              source: "1",
              model: context.MODEL,
              operatorOs: 'android ' + context.SYSTEM_VERSION,
              version: context.SDK_VERSION.toString(),
              sdkVersion:context.SDK_VERSION.toString(),
              deviceNo: context.GPS_ID,
              device: context.device,
              clientTime: DateUtil.format(),
              network:context.NETWORK.toString(),
              packageName:context.PACKAGE_NAME,
              exInfo: "",
              // ipAddress : ipAddress
            }, data => {
              data.ipAddress = ipAddress;
              const url = apiUrl + "/v2/user/init";
              httpTools.httpPost(url, data).then(res => res.json()).then(json=>{
                if(json.code === 200) {
                  console.log(json);
                  resolve(json);
                } else {
                  reject(json.error_msg);
                }
               
              }).catch(e => {
                reject(e)
              });
            })
          }
        })

      })

    })
  },
  getContext(callback){
    getAppContext(callback);
  }
};