/*
create by wanzhiyong 
desc:请求模块，还有初始化
 */
import wasabiapi from 'wasabi-api'
import func from '../component/libs/func'
import Mssaege from '../component/Info/Msg'
import config from "./config"

let ajax = function (settings) {
    let headers = getHeaders(settings.url)
    //说明要对接用管系统
    if (!func.isEmptyObject(headers)) {
        settings.headers = settings.headers instanceof Object ? Object.assign(settings.headers, headers) : headers

        let success = func.clone(settings.success)//复制一份
        //默认错误
        settings.error = settings.error ? settings.error : (message) => {
            Mssaege.error(message)
        }
        settings.success = (res) => {

            if (res && res.code && res.code == '401') {
                window.parent.postMessage(JSON.stringify({ msg: 'token过期' }), '*')

                settings.error(res.message)
            } else if (res && res.code && res.code != '200') {
                settings.error(res.message)
            } else {
                success && success(res)
            }
        }
    }
    settings.url=settings.url;//请求
    wasabiapi.ajax(settings)
}

let fetch = async function (fetchModel) {

    let headers = getHeaders();
    fetchModel.url=config.url+fetchModel.url;//添加前缀
    fetchModel.headers = fetchModel.headers && fetchModel.headers instanceof Object ? Object.assign(fetchModel.headers, headers) : {}
    let res = await wasabiapi.fetch(fetchModel)

    try {

        if (res && res.code && res.code == '401') {
            window.parent.postMessage(JSON.stringify({ msg: 'token过期' }), '*')
            return ('登陆失效') //返回json格式的数据
        } else if (res && res.code && res.code != '200') {

            //失败
            return (res.message) //返回错误
        } else {//成功
            if (typeof res == 'string') {
                return (res) //返回错误
            } else {
                return (res) //返回json格式的数据
            }
        }
    } catch (err) {
        return (err.message) //返回错误
    }

}
let getHeaders = function (url) {

    url=url?url.replace(config.url,""):url;
    url=url.indexOf("?")>-1?url.replace("?"+url.split("?")[1],""):url;
    let token = func.GetArgsFromHref(window.location.href, 'token') ? func.GetArgsFromHref(window.location.href, 'token') : window.sessionStorage.getItem('token')
    let headers = {}
    if (token) {
        let userId = func.GetArgsFromHref(window.location.href, 'userId') ? func.GetArgsFromHref(window.location.href, 'token') : window.sessionStorage.getItem('userId')
        let perId = func.GetArgsFromHref(window.location.href, 'perId') ? func.GetArgsFromHref(window.location.href, 'perId') : window.sessionStorage.getItem('perId')
        let sysId = func.GetArgsFromHref(window.location.href, 'sysId') ? func.GetArgsFromHref(window.location.href, 'sysId') : window.sessionStorage.getItem('sysId')

        window.sessionStorage.setItem('token', token)
        window.sessionStorage.setItem('userId', userId)
        window.sessionStorage.setItem('perId', perId)
        window.sessionStorage.setItem('sysId', sysId)
        let rock = config.rock//密钥
        headers.token = token
        headers.sysId = sysId
        headers.perId = perId
        headers.dateTime = new Date().getTime()//时间
        headers.ciphertext = wasabiapi.crypto(token + sysId + perId + url + rock + headers.dateTime, "SHA256");//加密字符串
    }
    return headers


}

let location = function () {

    let path = func.GetArgsFromHref(window.location.href, 'path')//如果有地
    //if(window.location.href.indexOf("token")>-1){
    if (window.location.href.indexOf('typtUserInfo') > -1) {//说明是用管系统过来的
        //绝对定位，改成相对
        path = path.indexOf('./') <= -1 ? path.replace('/', './') : path
        if (path == '' || path == './') {
            //默认页跳转到home

            path = './home.html'
        }
        window.location.href = path + window.location.href.substring(window.location.href.indexOf("?"))//
    }


}
let message = function (that) {

    if (window.location.href.indexOf('typtUserInfo') > -1) {//说明是用管系统过来的

        //默认页,首页添加监听
        window.addEventListener('message', (event) => {
            console.log('用户信息', event.data, '用户信息类型', typeof event.data)
            let data = event.data

            if (data && typeof data == 'string') {//如果是字符串
                data = JSON.parse(data)
            } else {
                console.log('输出用户信息', typeof data)
            }
            if (data && data.userName) {
                console.log('成功拿到用户', data)
                //确定是用户信息
                if (that) {
                    that.setState({
                        userInfo: data,
                    })
                }

                window.sessionStorage.setItem('userInfo', JSON.stringify(data))
                console.log('用户信息', data)


            }
        }, false)


    }


}

let crpto = function (url) {
    let headers = getHeaders(url)
    if (headers.token) {
        let str = 'token=' + headers.token + '&sysId=' + headers.sysId + '&perId=' + headers.perId + '&ciphertext=' + headers.ciphertext + '&dateTime=' + headers.dateTime
        if (url.indexOf('?') > -1) {
            url += '&' + str
        } else {

            url += '?' + str
        }
    }

    return url
}

/**
 *
 * @param {*} url
 * @param {*} success
 */
let get = function (url, success) {
    let settings = {
        url: url,
        type: 'get',
        success: success,
    }
    ajax(settings)

}
let post = function (url, data, success,contentType="application/json") {
    let settings = {
        url: url,
        type: 'post',
        contentType: contentType,
        data: contentType=="application/json"?JSON.stringify(data):data,
        success: success,
    }
    ajax(settings)

}
export default { ajax, fetch, get, post, location, message, crpto,getHeaders }
