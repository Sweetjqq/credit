import fecha from 'fecha'

/**
 * Utility function to generate table column object used by table components's columns prop
 * @param {String} name Column name
 * @param {String} title Column title
 * @param {Boolean} sortable Indicates whether the column is sortable
 * @param {String} hidden Indicates whether to hide the column
 */
export const createTableColumn = (
  name,
  title,
  sortable = false,
  hidden = false
) => {
  return {
    name,
    title,
    sortable: sortable ? 'custom' : false,
    hidden
  }
}

var qs = require('querystring');
export const parseUrl = (queryObj) => {
  queryObj = queryObj || {};
  let queryParams = null;
  const search = window.location.hash;
  if (search.indexOf('?') != -1) {
    queryParams = search.substr(search.indexOf('?') + 1);
  }
  if (!queryParams) return;
  queryObj = Object.assign(queryObj, qs.parse(queryParams));
  return queryObj;
 
};


export const format = () => {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
  return currentdate;
}



/**
 * Utility method to generate cumtomized validator used by form validation.
 * @param {*} rules Array of rule object which has `expression` and message `field`.
 */
export const createValidator = (rules = []) => {
  return (rule, value, callback) => {
    rules.forEach(rule => {
      if (!rule.expression.test(value)) {
        return callback(rule.message)
      }
    })
    callback()
  }
}

/**
 * Utility method to generate a validation rule object
 */
export const createValidationRule = (
  message,
  type = 'string',
  required = true,
  trigger = 'blur'
) => {
  return {
    message,
    type,
    required,
    trigger
  }
}

export const date = {
  format: (value, format = 'YYYY-MM-DD') => {
    if (!value) return value
    return fecha.format(value, format)
  },
  parse: fecha.parse
}

/**
 * Utility function to parse dictionary object to option object
 * @param {Object} dictionary Object which has `code` and `label` field
 * @return {Object} Object which has `value` and `label` field
 */
export const parseDictionaryToOption = dictionary => {
  return {
    value: dictionary.code,
    label: dictionary.label
  }
}

const traverse = (obj, fn) => {
  if (
    !obj ||
    !(typeof obj === 'object') ||
    !fn ||
    !(typeof fn === 'function')
  ) {
    return
  }

  for (let key of Object.keys(obj)) {
    fn(obj, key)
    traverse(obj[key], fn)
  }
}

export const resetDeep = (obj, defaultValue = undefined) => {
  traverse(obj, (obj, key) => {
    obj[key] = obj[key] || defaultValue
  })
  return obj
}
