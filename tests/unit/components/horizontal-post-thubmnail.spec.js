/*eslint-env node, jest */
import { getMountedComponent, zenTags, mockPosts } from '../../helpers'
import HorizontalPostThumbnail from '../../../src/components/HorizontalPostThumbnail.vue'

const MOCK_POST = mockPosts[0]

describe('Component | Horizontal Post Thumbnail', () => {
    let component;

    beforeEach(() => {
        component = getMountedComponent(HorizontalPostThumbnail, zenTags, {
            post: MOCK_POST,
            bookmarked: false,
            isAuthenticated: false
        })
    })
    it('renders with appropriate properties', () => {
        const headerImg = component.find('.post-img-container > img')
        expect(headerImg.attributes().src).toBe(MOCK_POST.headerImg)

        const headerTitle = component.find('.post-content > .post-title')
        expect(headerTitle.text()).toBe(MOCK_POST.title)

        const subtitle = component.find('.post-content > .subtitle')
        expect(subtitle.text()).toBe(MOCK_POST.meta.subtitle)

        const tags = component.findAll('.post-content > .tag')
        expect(tags.length).toBe(MOCK_POST.tags.length)
    })

    it('does not render bookmark if not authenticated', () => {
        component.setProps({bookmarked: true})
        
        component.vm.$nextTick(() => {
            const bookmark = component.find('.bookmark')
            expect(bookmark.exists()).toBeFalsy()
        })
    })

    it('renders bookmark when authenticated', () => {
        component.setProps({bookmarked: true, isAuthenticated: true})

        component.vm.$nextTick(() => {
            const bookmark = component.find('.bookmark')
            expect(bookmark.exists()).toBeTruthy()
        })
    })

    it('renders appropriate alt image text', () => {
        const headerImg = component.find('.post-img-container > img')
        const expectation = `${MOCK_POST.title} header image`
        expect(headerImg.attributes().alt).toBe(expectation)
    })
})