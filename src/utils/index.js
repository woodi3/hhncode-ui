export * from './cssClass'
export * from './hash'
export * from './generateAlphabeticName'

/**
* Determines if a value is a number
*/
export const isNum = (val) => {
   return typeof val === 'number' && !isNaN(val)
}