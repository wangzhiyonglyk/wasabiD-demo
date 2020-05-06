/**
 * Created by wangzhiyong on 2016/12/12.
 * 
 */
export default {
on (el, type, callback) {
    if(el.addEventListener) {
        el.addEventListener(type, callback);
    } else {
        el.attachEvent('on' + type, function() {
            callback.call(el);
        });
    }
},
off (el, type, callback) {
    if(el.removeEventListener) {
        el.removeEventListener(type, callback);
    } else {
        el.detachEvent('on' + type, callback);
    }
}
}