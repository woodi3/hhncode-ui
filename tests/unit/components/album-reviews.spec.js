/*eslint-env node, jest */
import { getMountedComponent, zenTags, mockPosts } from '../../helpers'
import AlbumReviewsComponent from '../../../src/components/AlbumReviews.vue'

describe('Component | Album Reviews', () => {
    let component;

    beforeEach(() => {
        component = getMountedComponent(AlbumReviewsComponent, zenTags, {
            albumReviews: []
        })
    })
    it('renders same amount of album reviews', () => {
        component.setProps({
            albumReviews: mockPosts
        })
        component.vm.$nextTick(() => {
            const albumReviewElements = component.findAll('.album-review')

            expect(
                albumReviewElements.length
            ).toBe(component.props('albumReviews').length);
        })
    })

    it('sets active review on load', () => {
        component.setProps({
            albumReviews: mockPosts
        })
        component.vm.$nextTick(() => {
            expect(
                mockPosts[0]._id
            ).toBe(
                component.vm.$data.activeReview._id
            )
        })
    })

    it('renders correct alt img text', () => {
        const altText = component.vm.getImageAltText(mockPosts[0])

        expect(altText).toBe(`Album cover for ${mockPosts[0].title}`)
    })
})