/*eslint-env node, jest */
import { getMountedComponent, mockPosts, zenTags } from '../../helpers'
import TrendingPosts from '../../../src/components/TrendingPosts.vue'

describe('Component | Trending Posts', () => {
    let component;

    beforeEach(() => {
        component = getMountedComponent(TrendingPosts, zenTags, {
            posts: mockPosts,
            loading: true,
        }, {
            data() {
                return {
                    currentIndex: 0
                }
            }
        })
    })
    it('renders post properties correctly', () => {
        component.setProps({ loading: false })
        component.vm.$nextTick(() => {
            // test currentPost was set
            expect(component.vm.currentPost)
                .toStrictEqual(mockPosts[0])
            
            // test appropriate header img
            const headerImg = component.find('.trending-post-header-img > img')
            expect(headerImg.attributes().src)
                .toBe(mockPosts[0].headerImg)
            
            // test appropriate post title
            const postTitle = component.find('.post-title')
            expect(postTitle.text())
                .toBe(mockPosts[0].title)
            
            // test appropriate post subtitle
            const postSubtitle = component.find('.post-subtitle')
            expect(postSubtitle.text())
                .toBe(mockPosts[0].meta.subtitle)

            // test badge count matches
            const badges = component.findAll('.tag')
            expect(badges.length)
                .toBe(mockPosts[0].tags.length)
        })
    })

    it('returns correct post when currentIndex changes', () => {
        component.setProps({ loading: false })
        component.vm.$nextTick(() => {
            // test current post is correct
            expect(component.vm.currentPost)
                .toStrictEqual(mockPosts[0])
            // test current post is reflected when currentIndex changes
            component.vm.setCurrentIndex(1)
            expect(component.vm.currentPost)
                .toStrictEqual(mockPosts[1])
            // test current post is correct even when currentIndex becomes larger than length
            component.vm.setCurrentIndex(mockPosts.length + 5)
            expect(component.vm.currentPost)
                .toStrictEqual(mockPosts[0])
            // test current post is correct even when currentIndex becomes smaller than length
            component.vm.setCurrentIndex(-5)
            expect(component.vm.currentPost)
                .toStrictEqual(mockPosts[mockPosts.length - 1])
        })
    })
})