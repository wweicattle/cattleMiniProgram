import request from './request.js'
export function getCategory() {
  return request({
    url: '/category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    data: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  console.log(miniWallkey,type);
  return request({
    url: '/subcategory/detail',
    data: {
      miniWallkey,
      type
    }
  })
}