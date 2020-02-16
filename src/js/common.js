import { Message, MessageBox } from 'element-ui' //element-ui的全部组件
export default {
    //成功消息
    success(val) {
        let msg = window.messageInstance;
        if (msg && typeof msg.close == 'function') msg.close();
        window.messageInstance = Message({
            message: val,
            type: 'success'
        });
    },
    //提示消息
    tips(val) {
        let msg = window.messageInstance;
        if (msg && typeof msg.close == 'function') msg.close();
        window.messageInstance = Message({
            showClose: true,
            message: val
        });
    },
    //警告消息
    warning(val) {
        let msg = window.messageInstance;
        if (msg && typeof msg.close == 'function') msg.close();
        window.messageInstance = Message({
            showClose: true,
            message: val,
            type: 'warning'
        });
    },
    //失败消息
    error(val) {
        let msg = window.messageInstance;
        if (msg && typeof msg.close == 'function') msg.close();
        window.messageInstance = Message({
            showClose: true,
            message: val,
            type: 'error'
        });
    },
    //验证手机号码
    checkPhone(val) {
        var phone = val;
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            return false;
        } else {
            return true;
        }
    },
    //验证邮箱
    checkEmail(val) {
        var email = val;
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (reg.test(email)) {
            return true;
        } else {
            return false;
        }
    }
    //下一步

}