

import Native from './native';
import DateUtil from '../utils/dateUtils'
import { user } from '../dao/index'
import { user as userStore } from '../store'
import md5 from 'md5'
const apiUrl = "http://sdktest.atron.fun/atron";



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



const buildInitParams = function (callback) {
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
          sdkVersion: context.SDK_VERSION.toString(),
          deviceNo: context.GPS_ID,
          device: context.device,
          clientTime: DateUtil.format(),
          network: context.NETWORK.toString(),
          packageName: context.PACKAGE_NAME,
          exInfo: "",
        }, data => {
          data.ipAddress = ipAddress;
          callback(data);
        })
      }
    })
  })
}

const buildLoginParams = function (params, callback) {
  getAppContext(context => {
    getIPAddress((status, ipAddress) => {
      if (status === 200) {
        Native.sign({
          device: context.device,
          password: md5(params.password),
          packageName: context.PACKAGE_NAME,
          source: "1",
          operatorOs: 'android ' + context.SYSTEM_VERSION,
          email: params.email,
          appId: context.app_id.toString(),
          packageId: context.package_id.toString(),
          network: context.NETWORK.toString(),
          sdkVersion: context.SDK_VERSION.toString(),
          telephone: params.telephone,
          clientTime: DateUtil.format(),
          version: context.SDK_VERSION.toString(),
          deviceNo: context.GPS_ID,
          exInfo: params.exInfo,
          isLogin: params.isLogin,
          accountType: params.accountType,
          userName: params.userName,
          thirdPartyId: params.thirdPartyId,
          userChannel: params.userChannel,
          model: context.MODEL,
        }, data => {
          data.ipAddress = ipAddress;
          callback(data);
        });
      }
    })
  });
}


const passwordKey = "oneFlower1WorldOneLeaf1Bodhi";


const buildFacebookLoginParams = function (params, callback) {
  getAppContext(context => {
    getIPAddress((status, ipAddress) => {
      if (status === 200) {
        Native.sign({
          device: context.device,
          password: md5("fb-" + params.id + passwordKey),
          packageName: context.PACKAGE_NAME,
          source: "1",
          operatorOs: 'android ' + context.SYSTEM_VERSION,
          email: params.email ? params.email : "",
          appId: context.app_id.toString(),
          packageId: context.package_id.toString(),
          network: context.NETWORK.toString(),
          sdkVersion: context.SDK_VERSION.toString(),
          telephone: "",
          clientTime: DateUtil.format(),
          version: context.SDK_VERSION.toString(),
          deviceNo: context.GPS_ID,
          exInfo: "",
          isLogin: "1",
          accountType: "2",
          userName: "fb-" + params.id,
          thirdPartyId: params.name,
          userChannel: "0",
          model: context.MODEL,
        }, data => {
          data.ipAddress = ipAddress;
          callback(data);
        });
      }
    })
  });
}

const buildGoogleLoginParams = function (params, callback) {
  getAppContext(context => {
    getIPAddress((status, ipAddress) => {
      if (status === 200) {
        Native.sign({
          device: context.device,
          password: md5(params.id + passwordKey),
          packageName: context.PACKAGE_NAME,
          source: "1",
          operatorOs: 'android ' + context.SYSTEM_VERSION,
          email: params.email ? params.email : "",
          appId: context.app_id.toString(),
          packageId: context.package_id.toString(),
          network: context.NETWORK.toString(),
          sdkVersion: context.SDK_VERSION.toString(),
          telephone: "",
          clientTime: DateUtil.format(),
          version: context.SDK_VERSION.toString(),
          deviceNo: context.GPS_ID,
          exInfo: "",
          isLogin: "1",
          accountType: "3",
          userName: params.id + "@google",
          thirdPartyId: params.name,
          userChannel: "0",
          model: context.MODEL,
        }, data => {
          data.ipAddress = ipAddress;
          callback(data);
        });
      }
    })
  });
}


const buildVerifyPhoneParam = function (params, callback) {
  getAppContext(context => {
    Native.sign({
      appId: context.app_id.toString(),
      packageId: context.package_id.toString(),
      userId: userStore.userId.toString(),
      phone: params.phone.toString()
    }, data => {
      callback(data);
    });
  })

}

const buildVerifyEmailParam = function (params, callback) {
  getAppContext(context => {
    Native.sign({
      appId: context.app_id.toString(),
      packageId: context.package_id.toString(),
      userId: userStore.userId.toString(),
      email: params.email.toString()
    }, data => {
      callback(data);
    });
  })

}

const buildVerifyResultParam = function (params, callback) {
  getAppContext(context => {
    Native.sign({
      appId: context.app_id.toString(),
      packageId: context.package_id.toString(),
      userId: userStore.userId.toString(),
      verifyCheckCode: params.verifyCheckCode
    }, data => {
      callback(data);
    });
  })

}

const buildModifyPasswordParam = function (params, callback) {
  getAppContext(context => {
    Native.sign({
      appId: context.app_id.toString(),
      packageId: context.package_id.toString(),
      userId: userStore.userId.toString(),
      verifyCheckCode: params.verifyCheckCode,
      password: md5(params.password)
    }, data => {
      callback(data);
    });
  })

}

const buildModifyPhoneParam = function (params, callback) {
  getAppContext(context => {
    Native.sign({
      appId: context.app_id.toString(),
      packageId: context.package_id.toString(),
      userId: userStore.userId.toString(),
      verifyCheckCode: params.verifyCheckCode,
      phone: params.phone
    }, data => {
      callback(data);
    });
  })

}

const buildVisitorBindParam = function (params, callback) {
  getAppContext(context => {
    console.log(params);
    let form = {
      appId: context.app_id.toString(),
      userId: userStore.userId.toString(),
      userName: params.userName,
      accountType: params.accountType.toString(),
      email: params.email ? params.email : "",
    };
    console.log(form);
    if (form.accountType == 2) {
      form.password = md5(form.userName + passwordKey);
    } else {
      form.password = md5(params.password);
    }
    Native.sign(form, data => {
      callback(data);
    });
  })

}

export default {
  init: function () {
    return new Promise((resolve, reject) => {
      buildInitParams(data => {
        const url = apiUrl + "/v2/user/init";
        httpTools.httpPost(url, data).then(res => res.json()).then(json => {
          if (json.code === 200) {
            console.log(json);
            resolve(json);
          } else {
            reject(json.error_msg);
          }
        }).catch(e => {
          reject(e)
        });
      })

    })
  },
  login: function (params) {
    return new Promise((resolve, reject) => {
      buildLoginParams(params, data => {
        const url = apiUrl + "/v2/user/registry";
        httpTools.httpPost(url, data).then(res => res.json()).then(json => {
          if (json.code === 200) {
            console.log(json);
            userStore.accountType = json.data.accountType;
            userStore.userChannel = '0';
            userStore.userType = json.data.userType;
            userStore.userName = json.data.userName;
            userStore.userId = json.data.userId;
            userStore.password = params.password;
            userStore.nickName = json.data.userName;
            userStore.telephone = json.data.telephone;
            userStore.email = json.data.email;
            userStore.isLogin = true;
            user.addAccountOnNotExit({
              accountType: json.data.accountType,
              telephone: json.data.telephone,
              userType: json.data.userType,
              userName: json.data.userName,
              password: params.password,
              userId: json.data.userId,
              userType: json.data.userType,
              nickName: json.data.userName,
              loginTime: new Date()
            }, () => {
              resolve(json);
            });
          } else {
            reject(json.error_msg);
          }
        }).catch(e => {
          reject(e)
        });
      })

    })
  },
  facebookLogin(params) {
    return new Promise((resolve, reject) => {
      buildFacebookLoginParams(params, data => {
        const url = apiUrl + "/v2/user/registry";
        httpTools.httpPost(url, data).then(res => res.json()).then(json => {
          if (json.code === 200) {
            console.log(json);
            userStore.accountType = json.data.accountType;
            userStore.userChannel = '0';
            userStore.userType = json.data.userType;
            userStore.userName = json.data.userName;
            userStore.userId = json.data.userId;
            userStore.password = params.password;
            userStore.nickName = params.name;
            userStore.telephone = json.data.telephone;
            userStore.email = json.data.email;
            userStore.isLogin = true;
            user.addAccountOnNotExit({
              accountType: json.data.accountType,
              telephone: json.data.telephone,
              userType: json.data.userType,
              userName: json.data.userName,
              password: params.password,
              userId: json.data.userId,
              userType: json.data.userType,
              thirdPartyId: params.id,
              nickName: params.name,
              loginTime: new Date()
            }, () => {
              resolve(json);
            });
          } else {
            reject(json.error_msg);
          }
        }).catch(e => {
          reject(e)
        });
      })

    })
  },
  googleLogin(params) {
    return new Promise((resolve, reject) => {
      buildGoogleLoginParams(params, data => {
        const url = apiUrl + "/v2/user/registry";
        httpTools.httpPost(url, data).then(res => res.json()).then(json => {
          if (json.code === 200) {
            console.log(json);
            userStore.accountType = json.data.accountType;
            userStore.userChannel = '0';
            userStore.userType = json.data.userType;
            userStore.userName = json.data.userName;
            userStore.userId = json.data.userId;
            userStore.password = params.password;
            userStore.nickName = params.name;
            userStore.telephone = json.data.telephone;
            userStore.email = json.data.email;
            userStore.isLogin = true;
            user.addAccountOnNotExit({
              accountType: json.data.accountType,
              telephone: json.data.telephone,
              userType: json.data.userType,
              userName: json.data.userName,
              password: params.password,
              userId: json.data.userId,
              thirdPartyId: params.id,
              userType: json.data.userType,
              nickName: params.name,
              loginTime: new Date()
            }, () => {
              resolve(json);
            });
          } else {
            reject(json.error_msg);
          }
        }).catch(e => {
          reject(e)
        });
      })

    })
  },
  verifyPhone(params) {
    return new Promise((resolve, reject) => {
      buildVerifyPhoneParam(params, data => {
        const url = apiUrl + "/v2/verify/phone";
        httpTools.httpPost(url, data).then(res => res.json()).then(json => {
          if (json.code === 200) {
            console.log(json);
            resolve(json);
          } else {
            reject(json.error_msg);
          }
        }).catch(e => {
          reject(e)
        });
      })

    })
  },
  verifyEmail(params) {
    return new Promise((resolve, reject) => {
      buildVerifyEmailParam(params, data => {
        const url = apiUrl + "/v2/verify/Email";
        httpTools.httpPost(url, data).then(res => res.json()).then(json => {
          if (json.code === 200) {
            console.log(json);
            resolve(json);
          } else {
            reject(json.error_msg);
          }
        }).catch(e => {
          reject(e)
        });
      })

    })
  },
  verifyResult(params) {
    return new Promise((resolve, reject) => {
      buildVerifyResultParam(params, data => {
        const url = apiUrl + "/v2/verify/result";
        httpTools.httpPost(url, data).then(res => res.json()).then(json => {
          if (json.code === 200) {
            console.log(json);
            resolve(json);
          } else {
            reject(json.error_msg);
          }
        }).catch(e => {
          reject(e)
        });
      })

    })
  },
  modifyPassword(params) {
    return new Promise((resolve, reject) => {
      buildModifyPasswordParam(params, data => {
        const url = apiUrl + "/v2/user/modifyPassword";
        httpTools.httpPost(url, data).then(res => res.json()).then(json => {
          if (json.code === 200) {
            console.log(json);
            resolve(json);
          } else {
            reject(json.error_msg);
          }
        }).catch(e => {
          reject(e)
        });
      })

    })
  },
  modifyPhone(params) {
    return new Promise((resolve, reject) => {
      buildModifyPhoneParam(params, data => {
        const url = apiUrl + "/v2/user/modifyPhone";
        httpTools.httpPost(url, data).then(res => res.json()).then(json => {
          if (json.code === 200) {
            console.log(json);
            resolve(json);
          } else {
            reject(json.error_msg);
          }
        }).catch(e => {
          reject(e)
        });
      })

    })
  },
  visitorBind(params) {
    return new Promise((resolve, reject) => {
      buildVisitorBindParam(params, data => {
        const url = apiUrl + "/v2/verify/visitorBind";
        httpTools.httpPost(url, data).then(res => res.json()).then(json => {
          if (json.code === 200) {
            console.log(json);
            resolve(json);
          } else {
            reject(json.error_msg);
          }
        }).catch(e => {
          reject(e)
        });
      })

    })
  },
  getContext(callback) {
    getAppContext(callback);
  }
};