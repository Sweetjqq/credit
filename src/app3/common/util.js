const qs = require('querystring');
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 存储cookies
 * */
export const setCookie = (name, value) => {
    let Days = 0.5;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days * 12 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

/**
 *读取cookies
 * */
export const getCookie = (name) => {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

/**
 *删除cookies
 * */
export const removeCookie = (name) => {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}

/***
 * 格式化时间
 * */
export const format = () => {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    return currentdate;
}
export const ErrMsg = () => {
    this.$message({
        message: "操作超时,请重新操作!!"
    });
}

export const parseUrl = (queryObj) => {
    queryObj = queryObj || {};
    let queryParams = null;
    const search = window.location.href;
    if (search.indexOf('?') != -1) {
        queryParams = search.substr(search.lastIndexOf('?') + 1);
    }
    if (!queryParams) return;
    queryObj = Object.assign(queryObj, qs.parse(queryParams));
    return queryObj;
};