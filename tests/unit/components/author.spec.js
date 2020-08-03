/*eslint-env node, jest */
import { getMountedComponent, zenTags } from '../../helpers'
import dayjs from 'dayjs'
import AuthorComponent from '../../../src/components/Author.vue'

const DEFAULT_DATE = "Oct 15"

describe('Component | Author', () => {
    let component;

    beforeEach(() => {
        component = getMountedComponent(AuthorComponent, zenTags, {
            date: new Date().toString(),
            showBookmark: false,
            bookmarked: false
        }, {
            mocks: {
                $dayjs: dayjs
            }
        })
    })
    it('renders proper date', () => {
        component.setProps({
            date: new Date('10-15-2020')
        })
        component.vm.$nextTick(() => {
            const date = component.find('.created')

            expect(
                date.text()
            ).toBe(DEFAULT_DATE);
        })
    })
})