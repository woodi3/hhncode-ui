
export const MOBILE = 'MOBILE'
export const TABLET = 'TABLET'
export const DESKTOP = 'DESKTOP'

const MOBILE_MAX = 800
const TABLET_MAX = 1024

export const getDevice = () => {
    if (window.innerWidth < MOBILE_MAX)
        return MOBILE
    if (window.innerWidth >= MOBILE_MAX && window.innerWidth < TABLET_MAX)
        return TABLET

    return DESKTOP
}

export const DEVICE_ENUM = {
    MOBILE,
    TABLET,
    DESKTOP,
}
