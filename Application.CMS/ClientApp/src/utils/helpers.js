import { decode as base64_decode, encode as base64_encode } from 'base-64';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { ACCESS_TOKEN, USER_LOCALSTORAGE, EXPIRES_AT_LOCALSTORAGE, URL_ERROR, PERMISS_USER_CURRENT } from './constants';
const storage = window.localStorage;
const domain = "http://localhost:8082/";
export const url_upload = `${domain}WeatherForecast/Upload-Post`;
export const parseJwt = () => {
    var token = getAccessToken();
    var base64Url = token.split('.')[1];
    //var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
};
const getCurrentDateTime_Belong_TimeZone = () => {
    let dateTime_TimeZone = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    let expires = new Date(dateTime_TimeZone)
    return expires;
}
export const getCurrentLogin = () => {
    return JSON.parse(localStorage.getItem(USER_LOCALSTORAGE));
}
export const getToTalMiniSeconds_CurrentDateTime_Belong_TimeZone = (times) => {
    //times:minutes
    let dateTime_TimeZone = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    let expires = new Date(dateTime_TimeZone)
    var totalMiniseconds = expires.getTime() + (times * 60 * 1000)
    return totalMiniseconds;
}

export const setCookie = (name, value, options = {}) => {

    options = {
        path: '/',
        // add other defaults here if necessary
        ...options
    };

    //if (options.expires instanceof Date) {
    //    options.expires = options.expires.toUTCString();
    //}

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}
function getCookie(name) {
    var regexp = new RegExp("(?:^" + name + "|;\s*" + name + ")=(.*?)(?:;|$)", "g");
    var result = regexp.exec(document.cookie);
    return (result === null) ? null : result[1];
}
function deleteCookie(name, path) {
    // If the cookie exists
    if (getCookie(name)) {
        //setCookie(name, "", { setMaxAge: -1, path: path });
        document.cookie = `${name}=;{setMaxAge:-1,path:${path}}`
    }

}
export const returnLogin = () => {
    //deleteCookie(base64_encode(ACCESS_TOKEN), "/")
    window.localStorage.removeItem(base64_encode(ACCESS_TOKEN))
    window.localStorage.removeItem(EXPIRES_AT_LOCALSTORAGE)
    window.localStorage.removeItem(USER_LOCALSTORAGE)
    window.localStorage.removeItem(PERMISS_USER_CURRENT)
}
//export const getAccessToken = () => storage.getItem("access_token");
export const getAccessToken = () => {
    let date = storage.getItem(EXPIRES_AT_LOCALSTORAGE)
    let expires = getCurrentDateTime_Belong_TimeZone()
    let totalMiniSecondNow = expires.getTime();
    if (Number.parseInt(totalMiniSecondNow) > Number.parseInt(date)) {
        //deleteCookie(base64_encode(ACCESS_TOKEN), "/")
        window.localStorage.removeItem(base64_encode(ACCESS_TOKEN))
        window.localStorage.removeItem(EXPIRES_AT_LOCALSTORAGE)
        window.localStorage.removeItem(USER_LOCALSTORAGE)
        window.localStorage.removeItem(PERMISS_USER_CURRENT)
    }
    //return getCookie(base64_encode(ACCESS_TOKEN));
    return window.localStorage.getItem(base64_encode(ACCESS_TOKEN))
}
export const setLocalStorage = (name, value) => {
    storage.setItem(name, value);
}
export function getLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}
//export const setAccessToken = (token) => storage.setItem("access_token", token);
//export const removeAccessToken = () => storage.removeItem("access_token");
export const isLoggedIn = () => Boolean(getAccessToken());
export const postAPI = async (url, data, isCheckToken = true) => {

    var headers = {}
    if (isCheckToken == false) {
        headers = {
            'Accept': "application/json, application/xml, text/plain, text/html, *.*",
            'Content-Type': "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
    }
    else {
        headers = {
            'Accept': "application/json, application/xml, text/plain, text/html, *.*",
            'Content-Type': "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            'Authorization': getAccessToken()
        }
    }
    var dataReturn = {}
    try {
        var fetchData = await axios({
            method: 'post',
            url: domain + url,
            data: data,
            headers: headers
        });
        var JsonData = await fetchData.data

        return JsonData
    }
    catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
            window.location.href = URL_ERROR
        }
        //dataReturn = {
        //    status: error.response.status
        //}
        //return dataReturn

    }
    //axios.interceptors.response.use(response => {
    //    return response;
    //}, error => {
    //    if (error.response.status === 401) {
    //        //place your reentry code
    //        console.log("loi 401")
    //    }
    //    //return error;
    //        console.log(error)
    //});
}

export async function getAPI(url, data, isCheckToken = true) {
    var headers = {}
    var dataReturn = {}
    if (isCheckToken == false) {
        headers = {
            'Accept': "application/json, application/xml, text/plain, text/html, *.*",
            'Content-Type': "application/json; charset=UTF-8"
        }
    }
    else {
        headers = {
            'Accept': "application/json, application/xml, text/plain, text/html, *.*",
            'Content-Type': "application/json; charset=UTF-8",
            'Authorization': getAccessToken()
        }
    }
    try {
        var fetchData = await axios({
            method: 'get',
            url: domain + url,
            data: data,
            headers: headers
        });
        var JsonData = await fetchData.data
        //dataReturn = {
        //    status: 200,
        //    data: fetchData.data
        //}
        return JsonData
    }
    catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
            window.location.href = URL_ERROR
        }
        //dataReturn = {
        //    status: error.response.status
        //}
        //return dataReturn
        //console.log(error.response.status)
    }
    //return JsonData
}

//# sourceMappingURL=helpers.js.map