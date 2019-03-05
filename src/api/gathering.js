import request from '@/utils/request'
const group = 'api'
const api = 'gathering'
export default {
  getList() {
    return request({
      url: `/${group}/${api}`,
      method: 'get'
    })
  },
  search(page, size, searchMap) {
    return request({
      url: `/${group}/${api}/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  save(pojo) {
    return request({
      url: `/${group}/${api}`,
      method: 'post',
      data: pojo
    })
  },
  findById(id) {
    return request({
      url: `/${group}/${api}/${id}`,
      method: 'get'
    })
  },
  update(id, pojo) {
    if (id === '' || id == null) {
      return save(pojo)
    }
    return request({
      url: `/${group}/${api}/${id}`,
      method: 'put',
      data: pojo
    })
  },
  deleteById(id) {
    return request({
      url: `/${group}/${api}/${id}`,
      method: 'delete'
    })
  }
}
