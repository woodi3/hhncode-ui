export * from './cssClass'
export * from './hash'
export * from './generateAlphabeticName'
export * from './quillConfig'

/**
* Determines if a value is a number
*/
export const isNum = (val) => {
   return typeof val === 'number' && !isNaN(val)
}

export function getAuthHeader(token) {
   return {
      'Authorization': token
   }
}

export function validEmail(email) {
   const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
   return regex.test(email.trim())
}

export function hasValue(val) {
   return val && val !== '' && val.trim() !== ''
}

export function unique(array, propertyName) {
   return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
}

export const INPUT_STATES = {
   STARTED: "started",
   NONE: "none",
}