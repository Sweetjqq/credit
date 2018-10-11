import { dictionaries } from './dictionary'

export const createTrustRecord = () => {
  return {
    text: '',
    password: '',
    textarea: '',
    date: '',
    select: {
      code: ''
    },
    checkbox: [],
    radio: {
      code: ``
    }
  }
}

const trustRecordList = []
let id = 1

export default {
  fetchTrustRecordList(params) {
    const { page, size, query } = params
    let content = trustRecordList
    const { sort } = query

    // // simulating query
    if (query.text) {
      content = content.filter(
        item =>
          item.text.indexOf(query.text) > -1 ||
          item.textarea.indexOf(query.text) > -1
      )
    }

    if (query.select) {
      content = content.filter(item => item.select.code === query.select)
    }

    if (query.date && query.date.length) {
      content = content.filter(
        item => item.date >= query.date[0] && item.date <= query.date[1]
      )
    }

    content = content.filter((item, index) => {
      return index >= page * size && index < (page + 1) * size
    })

    if (sort) {
      const [field, direction] = sort.split(',')
      content = content.sort((a, b) => {
        const ratio = direction === 'asc' ? 1 : -1
        let compare = a[field] > b[field] ? 1 : -1

        return ratio * compare
      })
    }

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            content,
            totalElements: trustRecordList.length
          }
        })
      }, 1500)
    })
  },

  fetchTrustRecord(id) {
    const data = trustRecordList.find(item => item.id === id)

    return Promise.resolve({
      success: true,
      data
    })
  },

  saveTrustRecord(data) {
    const getOptionLabel = code => {
      if (code) {
        return dictionaries.find(item => item.code === code).label
      } else {
        return ''
      }
    }

    data.select.label = getOptionLabel(data.select.code)
    data.radio.label = getOptionLabel(data.radio.code)
    data.checkbox.forEach(item => {
      item.label = getOptionLabel(item.code)
    })

    if (data.id) {
      let index = trustRecordList.indexOf(
        trustRecordList.find(item => item.id === data.id)
      )
      trustRecordList.splice(index, 1, data)
      // 修改
    } else {
      // 新增
      trustRecordList.push({ id: id++, ...data })
    }
    return Promise.resolve(true)
  },

  removeTrustRecord(id) {
    let index = trustRecordList.indexOf(
      trustRecordList.find(item => item.id === id)
    )
    trustRecordList.splice(index, 1)
    return Promise.resolve(true)
  }
}
