/*eslint-env node, jest */
import { getMountedComponent, mockPosts, zenTags } from '../../helpers'
import MobileTrendingPosts from '../../../src/components/MobileTrendingPosts.vue'

describe('Component | Mobile Trending Posts', () => {
    let component;

    beforeEach(() => {
        component = getMountedComponent(MobileTrendingPosts, zenTags, {
            posts: mockPosts,
            loading: true,
            hideTrending: false,
            height: "600px"
        }, {
            data () {
                return {
                    currentIndex: 0
                }
            }
        })
    })
    it('renders post properties correctly', () => {
        component.setProps({loading: false})
        component.vm.$nextTick(() => {
            // test currentPost was set
            expect(component.vm.currentPost)
                .toStrictEqual(mockPosts[0])
            // test appropriate header img
            const headerImg = component.find('.mobile-trending-post-img > img')
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
            // test arrows show
            const arrows = component.find('.arrows')
            expect(arrows.exists())
                .toBeTruthy()
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
            component.vm.setCurrentIndex(mockPosts.length+5)
            expect(component.vm.currentPost)
                .toStrictEqual(mockPosts[0])
            // test current post is correct even when currentIndex becomes smaller than length
            component.vm.setCurrentIndex(-5)
            expect(component.vm.currentPost)
                .toStrictEqual(mockPosts[mockPosts.length-1])
        })
    })

    it('renders appropriate container width and img height based on height prop', () => {
        component.setProps({loading: false, height: "500px"})
        const expectedImgHeight = (parseInt("500px", 10) / 2) + 'px'
        const expectedContainerWidth = (parseInt("500px", 10) * 0.47) + 'px'

        component.vm.$nextTick(() => {
            expect(component.vm.imgHeight)
                .toBe(expectedImgHeight)

            expect(component.vm.containerWidth)
                .toBe(expectedContainerWidth)
        })
    })
})