


const objectToUrlParam = function(params){
    var urlParams = "";
    for(let name in params){
        urlParams+="&"+name+"="+params[name];
    }
    return urlParams.substring(1);
}

export default {
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
};