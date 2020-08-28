/*eslint-env node, jest */
import { getMountedComponent, zenTags, mockPosts, mocks } from '../../helpers'
import CodePreviewComponent from '../../../src/components/CodePreview.vue'

const DEFAULT_PROPS = {
    posts: [],
    loading: false,
    isAuthenticated: false
}

describe('Component | Code Preview', () => {
    let component;

    beforeEach(() => {
        component = getMountedComponent(CodePreviewComponent, zenTags, DEFAULT_PROPS, {
            mocks: {
                $store: mocks.$store
            },
            mounted () {}
        })
    })
    test.skip('renders proper posts', () => {
        component.setProps(
            {
                ...DEFAULT_PROPS,
                posts: mockPosts
            }            
        )

        component.vm.$nextTick(() => {
            const posts = component.findAll('.post-thumbnail')
            expect(posts.length).toBe(mockPosts.filter(p => p.isCode && !p.isTutorial).length)
        })
    })

    // it('renders mobile view', () => {
    // })

    // it('sets tabs properly', () => {
    // })


})