
export function setSession(key,value) {
    var jsonString = sessionStorage.getItem(key);
    jsonString = jsonString || "[]";
    sessionStorage.setItem(key, JSON.stringify([value]));
}
export function getSession(key) {
    var jsonString = sessionStorage.getItem(key);
    jsonString = jsonString || "[]";
    return JSON.parse(jsonString)
}


export function setLocalStorage(key, value) {
    var jsonString = localStorage.getItem(key);
    jsonString = jsonString || "[]";
    var arr = JSON.parse(jsonString);
    arr.push(value);
    localStorage.setItem(key, JSON.stringify(arr));
}

export function getLocalStorage(key) {
    var jsonString = localStorage.getItem(key);
    jsonString = jsonString || "[]";
    return JSON.parse(jsonString)
}
export function removerStorage(key) {
    localStorage.removeItem(key, "[]")
}
export function removerSession(key) {
  sessionStorage.removeItem(key, "[]")
}

export function setLocalStorageUserInfo(key,value){
  var jsonString = sessionStorage.getItem(key);
  jsonString = jsonString || "[]";
  var arr = JSON.parse(jsonString);
  arr.push(value);
  sessionStorage.setItem(key, JSON.stringify(arr));
}

export function getLocalStorageUserInfo(key){
  var jsonString = sessionStorage.getItem(key);
  jsonString = jsonString || "[]";
  return JSON.parse(jsonString)
}
