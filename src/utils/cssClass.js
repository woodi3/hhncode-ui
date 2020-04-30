import stylis from 'stylis'
import hash from './hash'
// import generateAlphabeticName from './generateAlphabeticName'

let counter = 1

/**
 * Converts a string to kebab case ex. some-string
 * @param {string} str 
 */
const convertCamelToKebab = (str) => {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * Converts a json object to valid css string
 * @param {object} json 
 */
const convertToCss = (json) => {
    let result = ''
    Object.keys(json).forEach(k => {
        const attr = convertCamelToKebab(k)
        const val = json[k]
        result += `${attr}: ${val}; \n`
    })
    return result
}

export const createClassName = () => {
    counter++
    const componentId = `zen-${hash(`zen${counter}`)}`
    return componentId
}

/**
 * Injects a style tag into the head with provided styles
 * @param {string} className 
 * @param {object} stylesJSON 
 */
export const injectClass = (stylesJSON) => {
    const evaluatedStyles = convertToCss(stylesJSON)
    const className = createClassName()
    const cssStr = stylis(`.${className}`, evaluatedStyles)
    const style = document.createElement('style')
    style.type = `text/css`
    style.innerText = cssStr
    document.head.appendChild(style)
    return className
}