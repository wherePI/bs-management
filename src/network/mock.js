import request from "./request";

// mock请求
export function getMock() {
   return request.get('/mock')
}
export function progress(path, user) {
   let str = '?'
   let arr = Object.keys(user)
   if (arr.length) {
      for (var i =0; i< arr.length; i++) {
         str += `${arr[i]}=${user[arr[i]]}&&`
      }
   }
   return request.get(path + str)
}
