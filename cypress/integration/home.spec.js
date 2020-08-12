/* eslint-disable cypress/no-unnecessary-waiting */
/*eslint-env node, cypress */

describe('E2E - Home view', () => {
    // trending posts section
    describe('Trending posts', () => {
        it('loads trending posts', () => {
            // const className = '.trending-posts-container'

            // visit the website
            cy.visit('localhost:8080')
            // start the cypress server
            cy.server()

            // save the trending api request
            cy.route('/api/posts/client?limit=4&isTrending=true').as('trendingGet')

            // wait on it
            cy.wait('@trendingGet')

            cy.get('@trendingGet').then(({ response }) => {
                const { posts, success } = response.body
                expect(success).to.be.true
                expect(posts).to.be.a('array')
            })
        })
        it('changes post automatically', () => {
            const postTitle = '.trending-post-info-container .post-title'
            // visit the website
            cy.visit('localhost:8080')

            // start the cypress server
            cy.server()

            // save the trending api request
            cy.route('/api/posts/client?limit=4&isTrending=true').as('trendingGet')

            // wait on it
            cy.wait('@trendingGet')

            cy.get('@trendingGet').then(({ response }) => {
                const { posts } = response.body

                // verify the first post matches whats rendered
                cy.get(postTitle).then(postTitleEl => {
                    expect(postTitleEl.text()).to.equal(posts[0].title)
                })
                // wait for the animation to happen
                const ANIMATION_DELAY = 6000
                cy.wait(ANIMATION_DELAY)
                // check that the post changed
                cy.get(postTitle).then(postTitleEl => {
                    expect(postTitleEl.text()).to.equal(posts[1].title)
                })
            })
        })
        it('changes post when arrows clicked', () => {
            const postTitle = '.trending-post-info-container .post-title'
            const nextBtn = '.arrows .next-btn'
            const prevBtn = '.arrows .prev-btn'
            // visit the website
            cy.visit('localhost:8080')

            // start the cypress server
            cy.server()

            // save the trending api request
            cy.route('/api/posts/client?limit=4&isTrending=true').as('trendingGet')

            // wait on it
            cy.wait('@trendingGet')

            cy.get('@trendingGet').then(({ response }) => {
                const { posts } = response.body

                // verify the first post matches whats rendered
                cy.get(postTitle).then(postTitleEl => {
                    expect(postTitleEl.text()).to.equal(posts[0].title)
                })

                // click the next button
                cy.get(nextBtn).click()
                const ANIMATION_WAIT = 1500
                cy.wait(ANIMATION_WAIT)

                // check that the post changed
                cy.get(postTitle).then(postTitleEl => {
                    expect(postTitleEl.text()).to.equal(posts[1].title)
                })

                // want to go backwards to verify the loop around
                // click prev btn twice
                cy.get(prevBtn).click()
                cy.wait(ANIMATION_WAIT)
                cy.get(prevBtn).click()
                cy.wait(ANIMATION_WAIT)

                // check that the post changed
                cy.get(postTitle).then(postTitleEl => {
                    expect(postTitleEl.text()).to.equal(posts[posts.length - 1].title)
                })
            })
        })
    })

    // latest posts section
    describe('Latest posts', () => {
        it('shows latest post skeleton when loading', () => {
            const loadingClassName = '.horizontal-skeleton-thumbnail'
            const DELAY = 1000
            cy.visit('localhost:8080')
            cy.server()
            // set a delay on the end point
            cy.route({
                url: '/api/posts/client?limit=3',
                delay: DELAY
            }).as('latestGet')
            
            // verify that the loader skeleton is showing
            cy.get(loadingClassName).then(el => {
                expect(el.length).to.equal(3)
            })
        })
        it('shows latest posts after api call', () => {
            const itemsClassName = '.horizontal-post'
            const itemsHeaderImgClassName = '.post-img-container > img'

            cy.visit('localhost:8080')
            cy.server()
            cy.route('/api/posts/client?limit=3').as('latestGet')

            cy.wait('@latestGet')

            cy.get('@latestGet').then(({ response }) => {
                const { posts, success } = response.body
                // verify the response
                expect(success).to.be.true
                expect(posts).to.be.a('array')

                cy.get(itemsClassName).then(els => {
                    expect(els.length).to.equal(posts.length)

                    // map post to get header img urls
                    const postImgs = posts.map(post => post.headerImg)
                    cy.get(itemsHeaderImgClassName).then(imgs => {
                        // map the jquery like elements to get src attribute urls
                        const renderedSources = imgs
                            .map((_, img) => img.getAttribute('src'))
                            .toArray()
                        
                        // should match length
                        expect(renderedSources.length).to.equal(postImgs.length)

                        // should match urls
                        expect(renderedSources).to.deep.equal(postImgs)
                    })
                })
            })
        })
    })
})