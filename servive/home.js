import request from "./request.js";
export function achilveHomeData(){
  return request({
    url:"/home/multidata",
  })
}
export function getGoodsList(options){
  let type=options.type;
  let page=options.page;
  return request({
    url:`/home/data?type=${type}&page=${page}`
  })
}
