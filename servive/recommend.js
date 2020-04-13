import request from "./request.js";
export  function getRecommends(){
    return request({
      url:"/recommend"
    })
}