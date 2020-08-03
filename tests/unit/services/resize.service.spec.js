/*eslint-env node, jest */
import { getDevice } from '../../../src/services/resize.service'

describe('Service | Resize', () => {

    it('returns proper size based on device widths', () => {
        let device = getDevice()
        expect(device).toBe('DESKTOP')

        window.innerWidth = 750
        device = getDevice()
        expect(device).toBe('MOBILE')

        window.innerWidth = 900
        device = getDevice()
        expect(device).toBe('TABLET')
    })
})