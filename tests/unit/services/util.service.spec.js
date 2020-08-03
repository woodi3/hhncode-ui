/*eslint-env node, jest */
import { validEmail, unique } from '../../../src/utils'

describe('Service | Utils', () => {

    it('validEmail validates emails correctly', () => {
        // test valid email
        const vEmail = 'woodawilliam@gmail.com'
        expect(validEmail(vEmail)).toBeTruthy()
        // test invalid email
        const iEmail = 'someosm@.com'
        expect(validEmail(iEmail)).toBeFalsy()
    })

    it('unique returns unique array based on property correctly', () => {
        const array = [
            {
                fruit: 'apple',
                id: 1
            },
            {
                fruit: 'orange',
                id: 4
            },
            {
                fruit: 'apple',
                id: 2
            },
            {
                fruit: 'apple',
                id: 3
            },
        ]
        const expectation = [
            {
                fruit: 'apple',
                id: 1
            },
            {
                fruit: 'orange',
                id: 4
            },
        ]

        expect(unique(array, 'fruit')).toStrictEqual(expectation)
    })
})