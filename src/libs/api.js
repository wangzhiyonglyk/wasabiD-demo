/*
*/
import wasabiapi from "wasabi-api";
import config from "./config"
import unit from "../component/libs/unit";


    let ajax =function(settings) {
       
        let headers = getHeaders();
        //说明要对接用管系统         
        if (!unit.isEmptyObject(headers)) {
            settings.headers = settings.headers instanceof Object ? Object.assign(settings.headers, headers) : headers;

            let success = unit.clone(settings.success);//复制一份
            settings.success = (res) => {
                console.log("res",res);
                if (res&&res.code&&res.code == "401") {
                    window.parent.postMessage(JSON.stringify({ msg: "token过期" }), "*");

                    settings.error(null, res.code, res.message);
                }
                else if (res&&res.code&&res.code != "200") {
                    settings.error(null, res.code, res.message);
                }
                else {
                    success && success(res);
                }
            };
        }
        wasabiapi.ajax(settings);
    }
   let fetch = async function (fetchModel) {

        let headers = getHeaders();
        if (!unit.isEmptyObject(headers)) {
            fetchModel.headers = fetchModel.headers instanceof Object ? Object.assign(fetchModel.headers, headers) : headers;
            let res = await wasabiapi.fetch(fetchModel);
            try {


                if (res&&res.code&& res.code == "401") {
                    window.parent.postMessage(JSON.stringify({ msg: "token过期" }), "*");
                    return Promise.reject("登陆失效"); //返回json格式的数据  
                }
                else if (res&&res.code&& res.code != "200") {

                    //失败
                    return Promise.reject(res.message); //返回错误 
                }
                else {//成功
                    if (typeof res == "string") {
                        return Promise.reject(res); //返回错误 
                    }
                    else {
                        return Promise.resolve(res); //返回json格式的数据 
                    }
                }
            } catch (err) {
                return Promise.reject(err); //返回错误 
            }
        }
        else {
            let res = await wasabiapi.fetch(fetchModel);
            if (typeof res == "string") {
                return Promise.reject(res); //返回错误 
            }
            else {
                return Promise.resolve(res); //返回json格式的数据 
            }

        }

    }
     let getHeaders=function () {
      
        let token =  unit.GetArgsFromHref(window.location.href, "token")?unit.GetArgsFromHref(window.location.href, "token"): window.sessionStorage.getItem("token");
        let headers = {};
        if (token) {
            let userId = unit.GetArgsFromHref(window.location.href, "userId")?unit.GetArgsFromHref(window.location.href, "token"): window.sessionStorage.getItem("userId");
            let perId = unit.GetArgsFromHref(window.location.href, "perId")?unit.GetArgsFromHref(window.location.href, "perId"): window.sessionStorage.getItem("perId");
            let sysId = unit.GetArgsFromHref(window.location.href, "sysId")?unit.GetArgsFromHref(window.location.href, "sysId"): window.sessionStorage.getItem("sysId");

            window.sessionStorage.setItem("token", token);
            window.sessionStorage.setItem("userId", userId);
            window.sessionStorage.setItem("perId", perId);
            window.sessionStorage.setItem("sysId", sysId);

            let url = window.location.href;
            url = url ? url.replace(window.location.origin, "") : url;
            let rock = config.rock;//密钥

            headers.token = token;
            headers.sysId = sysId;
            headers.perId = perId;
            headers.dateTime = new Date().getTime();//时间
            headers.ciphertext = wasabiapi.crypto(token + sysId + perId + url + rock + headers.dateTime, "SHA256");//加密字符串

        }
        return headers;


 
}

export { ajax,fetch};
export default {ajax,fetch};