export const dictionaries = [
  {
    code: 'option1',
    label: '选项_1'
  },
  {
    code: 'option2',
    label: '选项_2'
  },
  {
    code: 'option3',
    label: '选项_3'
  },
  {
    code: 'option4',
    label: '选项_4'
  },
  {
    code: 'option5',
    label: '选项_5'
  }
]

export default {
  fetchDictionary(code, label) {
    return Promise.resolve({
      success: true,
      data: dictionaries
    })
  }
}
