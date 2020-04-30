
/**
 * Will represent the toast container
 */
let container = null

const activeToasts = []

/**
 * Creates a toast notification
 * @param {object} opts 
 */
const toast = (opts) => {
    let options = getDefaults()
    if (opts) {
        options = Object.assign({}, getDefaults(), opts)
    }
    
    // create container element 
    if (!container) {
        container = document.createElement(`div`)
        container.classList.add(`zen-toast-container`, `${options.position}`)
        container.setAttribute(`id`, `zenToastContainer`)
        document.body.appendChild(container)
    }
    // render
    displayToast(options)
}

/**
 * Displays the toast element
 * @param {object} options 
 */
const displayToast = (options) => {
    // create toast div
    const toastEl = document.createElement(`div`)

    // set the id
    const id = `zenToast${activeToasts.length + 1}`
    toastEl.setAttribute(`id`, id)

    // set aria role
    toastEl.setAttribute(`role`, `alert`)

    // set the classes
    toastEl.classList.add(...getClasses(options.type), `animate-${options.position}`)

    // set the HTML
    toastEl.innerHTML = `
            ${getIcon(options.type)}
            <div class="zen-toast-content pl-2 pr-2">
                <div class="zen-toast-title">${options.title}</div>
                <div class="zen-toast-message">${options.message}</div>
            </div>
            ${options.canClose ? `
                <div>
                    <button id="zenToastClose${id}" class="zen-toast-close zen-btn zen-btn-sm zen-btn-plain text-white">
                        <i class="fas fa-times"></i>
                    </button>
                </div>` 
            : ``}
        `

    // get previous toast
    let lastEl
    if (activeToasts.length > 0) {
        lastEl = document.getElementById(activeToasts[activeToasts.length-1].id)
    }

    // if previous toast and position is top
    // insert before
    if (lastEl && options.position.indexOf('top') > -1) {
        container.insertBefore(toastEl, lastEl)
    }
    else {
        container.appendChild(toastEl)
    }
    
    // if showing close button
    // add event listener
    if (options.canClose) {
        const closeBtn = document.getElementById(`zenToastClose${id}`)
        closeBtn.addEventListener('click', () => {
            hideToast(id)
        })
    }

    // set the timer
    const intervalId = setTimeout(() => {
        hideToast(id)
    }, options.duration)

    // add to list
    activeToasts.push({intervalId, id})
}

/**
 * Removes first toast element in the active toast array
 */
const hideToast = (toastId) => {
    if (!container || activeToasts.length === 0) return 

    // fade out the toast
    const toastEl = document.getElementById(toastId)
    toastEl.classList.add('fade-out')

    setTimeout(() => {
        // remove toast element
        if (container && container.contains(toastEl)) {
            container.removeChild(toastEl)
        }
        
        const obj = activeToasts.filter(t => t.id === toastId)[0]
        if (obj && obj.intervalId) {
            // clear timeout
            clearTimeout(obj.intervalId)
        }
        
        // remove from array
        activeToasts.splice(0, 1)

        // remove container
        if (activeToasts.length === 0) {
            removeContainer()
        }
    }, 750)
}

/**
 * Removes the toast container
 */
const removeContainer = () => {
    const containerEl = document.getElementById(`zenToastContainer`)
    if (containerEl) {
        document.body.removeChild(containerEl)
    }
    container = null
}

/**
 * Get HTML string representation of icon for toast
 * @param {string} type 
 */
const getIcon = (type) => {
    switch (type) {
        case `error`:
            return `
            <div class="zen-toast-icon font-lg pl-2 pr-2">
                <i class="fas fa-exclamation-circle"></i>
            </div>`
        case `warning`:
            return `
            <div class="zen-toast-icon font-lg pl-2 pr-2">
                <i class="fas fa-exclamation-triangle"></i>
            </div>`
        case `success`:
            return `
            <div class="zen-toast-icon font-lg pl-2 pr-2">
                <i class="fas fa-check"></i>
            </div>`
        default:
            return `
            <div class="zen-toast-icon font-lg pl-2 pr-2">
                <i class="fas fa-check"></i>
            </div>`
    }
}

/**
 * Returns a string separated by space indicating toast css classes
 * @param {string} type 
 * @param {string} position 
 */
const getClasses = (type) => {
    const classes = []
    switch (type) {
        case `error`:
            classes.push(`bg-danger`)
            break
        case `warning`:
            classes.push(`bg-accent`)
            break
        case `success`:
            classes.push(`bg-primary`)
            break
        default:
            classes.push(`bg-primary`)
    }
    classes.push(`zen-toast`)
    classes.push(`p-4`)
    return classes
}

/**
 * Returns the default options for the toast
 */
const getDefaults = () => {
    return {
        canClose: false,
        duration: 3000,
        position: `bottom-right`,
        type: `success`
    }
}

export default toast