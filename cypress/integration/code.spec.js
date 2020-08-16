/* eslint-disable cypress/no-unnecessary-waiting */
/*eslint-env node, cypress */

describe('E2E - Code View', () => {

    describe('desktop', () => {
        const CODE_GET = '@codeGET'
        const TAGS_GET = '@tagGET'
        const search = '.filter-posts .search input'
        const tagsEl = '.filter-posts .badge-box > .tag'
        const postsEl = '.filter-posts > .posts .post-thumbnail'
        let tags, posts
        before(() => {
            cy.visit('localhost:8080/code')
            cy.server()

            cy.route('api/posts/client?isTutorial=true&isCode=true&or=true&limit=15')
                .as(CODE_GET.substring(1))
            cy.route('api/tags')
                .as(TAGS_GET.substring(1))
            // wait on it
            cy.wait([CODE_GET, TAGS_GET])
        })
        beforeEach(() => {
            cy.get(search).type('{selectall}')
            cy.get(search).type('{backspace}')
        })
        it('renders correctly', () => {
            cy.get(search).should('be.visible')
            cy.get(tagsEl).should('be.visible')
            cy.get(postsEl).should('be.visible')

            cy.get(TAGS_GET).then(({ response }) => {
                const { success } = response.body
                tags = response.body.tags
                expect(success).to.be.true
                expect(tags).to.be.a('array')

                cy.get(tagsEl).then(tagBox => {
                    // minus 1 here because we inject an 'All' tag
                    // on the ui
                    expect(tagBox.length - 1).to.equal(tags.length)
                })
            })
            cy.get(CODE_GET).then(({ response }) => {
                const { success } = response.body
                posts = response.body.posts
                expect(success).to.be.true
                expect(posts).to.be.a('array')

                cy.get(postsEl).then(p => {
                    expect(p.length).to.equal(posts.length)
                })
            })
        })
        it('filters posts when searching', () => {
            cy.get(search).type('Angular')
            cy.get(postsEl).then(p => {
                expect(p.length).to.equal(1)
            })
        })
        it('shows search error if length < 2', () => {
            const searchErrClass = '.search-error'
            cy.get(search).type('H')
            cy.get(searchErrClass).should('be.visible')
        })
        it('filters posts when selecting badges', () => {
            cy.get(tagsEl).then(tags => {
                const announcementTag = tags.toArray()
                    .find(tag => tag.innerText === 'Angular')

                cy.get(announcementTag).click()
                cy.get(postsEl).then(p => {
                    expect(p.length).to.equal(1)
                })
                const allTag = tags.toArray()
                    .find(tag => tag.innerText === 'All')

                cy.get(allTag).click()
                cy.get(postsEl).then(p => {
                    expect(p.length).to.equal(posts.length)
                })
            })
        })
        it('navigates to post when clicked', () => {
            cy.get(postsEl).then(p => {
                cy.get(p[0]).click({ force: true })
                cy.location('search').then(searchStr => {
                    const params = new URLSearchParams(searchStr)

                    expect(params.get('_id')).to.equal(posts[0]._id)
                    expect(params.get('title')).to.equal(posts[0].title)
                })
            })
        })
    })
})