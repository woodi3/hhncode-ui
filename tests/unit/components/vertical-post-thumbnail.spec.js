/*eslint-env node, jest */
import { getMountedComponent, zenTags, mockPosts } from '../../helpers'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

import VerticalPostThumbnail from '../../../src/components/VerticalPostThumbnail.vue'

const MOCK_POST = mockPosts[0]

describe('Component | Vertical Post Thumbnail', () => {
    let component;

    beforeEach(() => {
        component = getMountedComponent(VerticalPostThumbnail, zenTags, {
            post: MOCK_POST,
            width: "300px",
            showTrend: false,
            isAuthenticated: false,
            bookmarked: false,
        }, {
            mocks: {
                $dayjs: dayjs
            }
        })
    })

    it('renders post properties correctly', () => {
        // test header img is rendered
        const headerImg = component.find('.post-thumbnail-img')
        expect(headerImg.attributes().src).toBe(MOCK_POST.headerImg)
        // test header img alt text is correct
        expect(headerImg.attributes().alt)
            .toBe(`Header image for post titled: ${MOCK_POST.title}`)
        // test badge count matches
        const badges = component.findAll('.tag')
        expect(badges.length).toBe(MOCK_POST.tags.length)
        // test post title shows
        expect(component.find('.post-title').text()).toBe(MOCK_POST.title)
        // test post subtitle shows
        expect(component.find('.post-subtitle').text())
            .toBe(MOCK_POST.meta.subtitle)
        // test bookmark doesn't show
        expect(component.find('.bookmark').exists()).toBeFalsy()
        // test poll doesn't show
        expect(component.find('.trend').exists()).toBeFalsy()
        // test draft doesn't show
        expect(component.find('.draft').exists()).toBeFalsy()

        component.setProps({ bookmarked: true, isAuthenticated: true })
        component.vm.$nextTick(() => {
            // test bookmark does show
            expect(component.find('.bookmark').exists()).toBeTruthy()
        })
    })
})