const storage = window.localStorage;
const domain = "http://localhost:8082";
//const authenticate=() =>{
//    return new Promise(resolve => setTimeout(resolve, 2000)) // 2 seconds
//}
//export const Loading = () => {
//    authenticate().then(() => {
//        const ele = document.getElementById('ipl-progress-indicator')
//        if (ele) {
//            // fade out
//            ele.classList.add('available')
//            setTimeout(() => {
//                // remove from DOM
//                ele.outerHTML = ''
//            }, 2000)
//        }
//    })
//}
export const parseJwt = () => {
    var token = getAccessToken();
    var base64Url = token.split('.')[1];
    //var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
};
export const getAccessToken = () => storage.getItem("access_token");
//export const getUser = () => storage.getItem("user");
//export const setUser = (user) => storage.setItem("user", user);
export const setAccessToken = (token) => storage.setItem("access_token", token);
export const removeAccessToken = () => storage.removeItem("access_token");
export const isLoggedIn = () => Boolean(getAccessToken());
export async function postFormData(url, data, isCheckToken = true) {
    var headers = new Headers();
    if (!isCheckToken) {
        headers.append("Accept", "application/json, application/xml, text/plain, text/html, *.*");
        headers.append("Content-Type", "application/json; charset=UTF-8");
        //headers.append("Content-Type", "multipart/form-data");
        headers.append("Access-Control-Allow-Origin", "*");
    }
    else {
        headers.append("Accept", "application/json, application/xml, text/plain, text/html, *.*");
        headers.append("Content-Type", "application/json; charset=UTF-8");
        //headers.append("Content-Type", "multipart/form-data");
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Authorization", "Bearer" + getAccessToken());
    }

    var fetchData = await fetch(`${domain}/${url}`, {
        method: 'POST',
        body: data,
    })
    var JsonData = await fetchData.json()
    return JsonData
}

export async function postAPI(url, data, isCheckToken = true){
    var headers = new Headers();
    if (!isCheckToken) {
        headers.append("Accept", "application/json, application/xml, text/plain, text/html, *.*");
        headers.append("Content-Type", "application/json; charset=UTF-8");
        //headers.append("Content-Type", "multipart/form-data");
        headers.append("Access-Control-Allow-Origin", "*");
    }
    else {
        headers.append("Accept", "application/json, application/xml, text/plain, text/html, *.*");
        headers.append("Content-Type", "application/json; charset=UTF-8");
        //headers.append("Content-Type", "multipart/form-data");
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Authorization", "Bearer" + getAccessToken());
    }
   
    var fetchData =await fetch(`${domain}/${url}`, {
        method: 'POST',
        headers: headers,
        body: data,
    })
    var JsonData = await fetchData.json()
    return JsonData
}

   export async function getAPI (url, data, isCheckToken = true){
    var headers = new Headers();

    if (isCheckToken == false) {
        headers.append("Accept", "application/json, application/xml, text/plain, text/html, *.*");
        headers.append("Content-Type", "application/json; charset=UTF-8");
        headers.append("Access-Control-Allow-Origin", "*");
    }
    else {
        headers.append("Accept", "application/json, application/xml, text/plain, text/html, *.*");
        headers.append("Content-Type", "application/json; charset=UTF-8");
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Authorization", "Bearer" + getAccessToken());
    }
    
   var fetchData=await fetch(`${domain}/${url}`, {
        method: 'GET',
        headers: headers,
        body: data
   })
        var JsonData = await fetchData.json()
        
        return JsonData
}

//# sourceMappingURL=helpers.js.map