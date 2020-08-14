/* eslint-disable cypress/no-unnecessary-waiting */
/*eslint-env node, cypress */

describe('E2E - Home view', () => {
    // trending posts section
    describe('Trending posts', () => {
        const TRENDING_GET = '@trendingGet'
        const ANIMATION_WAIT = 800
        beforeEach(() => {
            // visit the website
            cy.visit('localhost:8080')
            // start the cypress server
            cy.server()

            // save the trending api request
            cy.route('/api/posts/client?limit=4&isTrending=true').as(TRENDING_GET.substring(1))

            // wait on it
            cy.wait(TRENDING_GET)
        })

        describe('desktop', () => {
            it('loads trending posts from api', () => {
                cy.get(TRENDING_GET).then(({ response }) => {
                    const { posts, success } = response.body
                    expect(success).to.be.true
                    expect(posts).to.be.a('array')
                })
            })
            it('hides mobile trending post view', () => {
                const mobileContainer = '.mobile-trending-post'
                cy.get(mobileContainer).should('be.hidden')
            })
            it('changes post automatically', () => {
                const postTitle = '.trending-post-info-container .post-title'

                cy.get(TRENDING_GET).then(({ response }) => {
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
                const nextBtn = '.trending-posts-container .arrows .next-btn'
                const prevBtn = '.trending-posts-container .arrows .prev-btn'

                cy.get(TRENDING_GET).then(({ response }) => {
                    const { posts } = response.body

                    // verify the first post matches whats rendered
                    cy.get(postTitle).then(postTitleEl => {
                        expect(postTitleEl.text()).to.equal(posts[0].title)
                    })

                    // click the next button
                    cy.get(nextBtn).click()

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
            it('navigates to post when clicked', () => {
                cy.get(TRENDING_GET).then(({ response }) => {
                    const { posts } = response.body

                    const post = posts[0]

                    const infoClass = '.trending-post-info'
                    cy.get(infoClass).click({ force: true })

                    cy.location('search').then(searchStr => {
                        const params = new URLSearchParams(searchStr)

                        expect(params.get('_id')).to.equal(post._id)
                        expect(params.get('title')).to.equal(post.title)
                    })
                })
            })
        })
        describe('mobile', () => {
            beforeEach(() => {
                cy.viewport('iphone-6+')
                cy.wait(TRENDING_GET)
            })

            it('hides desktop trending view on mobile', () => {
                const trendingContainer = '.trending-posts-container'
                cy.get('body').then($body => {
                    expect($body.find(trendingContainer).length).to.equal(0)
                })
            })
            it('renders properly for mobile', () => {
                cy.get(TRENDING_GET).then(({ response }) => {
                    const { posts } = response.body
                    const post = posts[0]
                    const imgClass = '.mobile-trending-post-img > img'
                    const postTitleClass = '.mobile-trending-post-info-container > .post-title'

                    cy.get(imgClass).then(imgEl => {
                        expect(imgEl.attr('src')).to.equal(post.headerImg)
                    })
                    cy.get(postTitleClass).then(textEl => {
                        expect(textEl[0].innerText).to.equal(post.title)
                    })
                })
            })
            it('switches trending posts when arrows are clicked on mobile', () => {
                const nextBtn = '.mobile-trending-post-info-container .arrows .next-btn'
                const prevBtn = '.mobile-trending-post-info-container .arrows .prev-btn'

                cy.get(TRENDING_GET).then(({ response }) => {
                    const { posts } = response.body
                    const firstPost = posts[0]
                    const secondPost = posts[1]
                    const imgClass = '.mobile-trending-post-img > img'
                    const postTitleClass = '.mobile-trending-post-info-container > .post-title'

                    cy.get(nextBtn).click()
                    cy.wait(ANIMATION_WAIT)
                    cy.get(imgClass).then(imgEl => {
                        expect(imgEl.attr('src')).to.equal(secondPost.headerImg)
                    })
                    cy.get(postTitleClass).then(textEl => {
                        expect(textEl[0].innerText).to.equal(secondPost.title)
                    })

                    cy.get(prevBtn).click()
                    cy.wait(ANIMATION_WAIT)
                    cy.get(imgClass).then(imgEl => {
                        expect(imgEl.attr('src')).to.equal(firstPost.headerImg)
                    })
                    cy.get(postTitleClass).then(textEl => {
                        expect(textEl[0].innerText).to.equal(firstPost.title)
                    })
                })
            })
            it('navigate to post when clicked', () => {
                const imgContainerClass = '.mobile-trending-post-img'
                
                cy.get(TRENDING_GET).then(({ response }) => {
                    const { posts } = response.body

                    const post = posts[0]

                    cy.get(imgContainerClass).then(imgs => {
                        imgs[0].click()
                    })

                    cy.location('search').then(searchStr => {
                        const params = new URLSearchParams(searchStr)

                        expect(params.get('_id')).to.equal(post._id)
                        expect(params.get('title')).to.equal(post.title)
                    })
                })
            })
        })
    })

    // latest posts section
    describe('Latest posts', () => {
        const DELAY = 1000
        beforeEach(() => {
            cy.visit('localhost:8080')
            cy.server()
            // set a delay on the end point
            cy.route({
                url: '/api/posts/client?limit=3',
                delay: DELAY
            }).as('latestGet')
        })
        it('shows latest post skeleton when loading', () => {
            const loadingClassName = '.horizontal-skeleton-thumbnail'
            
            // verify that the loader skeleton is showing
            cy.get(loadingClassName).then(el => {
                expect(el.length).to.equal(3)
            })
        })
        it('shows latest posts after api call', () => {
            const itemsClassName = '.horizontal-post'
            const itemsHeaderImgClassName = '.post-img-container > img'

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
        it('navigates to post when clicked', () => {
            cy.wait('@latestGet')

            cy.get('@latestGet').then(({ response }) => {
                const { posts } = response.body

                const post = posts[0]

                const postClass = '.horizontal-post'
                cy.get(postClass).then(els => {
                    els[0].click()
                })

                cy.location('search').then(searchStr => {
                    const params = new URLSearchParams(searchStr)

                    expect(params.get('_id')).to.equal(post._id)
                    expect(params.get('title')).to.equal(post.title)
                })
            })
        })
    })
    
    // album review section
    describe('Album Reviews', () => {
        beforeEach(() => {
            // visit the website
            cy.visit('localhost:8080')

            // start the cypress server
            cy.server()

            // save the album reviews api request
            cy.route('/api/posts/client?limit=4&isReview=true').as('albumReviewsGet')

            // wait on it
            cy.wait('@albumReviewsGet')
        })
        it('should load review posts from api', () => {
            const albumReviewClassName = '.album-review'

            cy.get('@albumReviewsGet').then(({ response }) => {
                const { success, posts } = response.body
                
                // verify the response
                expect(success).to.be.true
                expect(posts).to.be.a('array')
                cy.get(albumReviewClassName).then(els => {
                    expect(els.length).to.equal(posts.length)
                })
            })
        })
        it('navigates to post when clicked', () => {
            const detailBtn = '.detail-btn'
            cy.get('@albumReviewsGet').then(({ response }) => {
                const { posts } = response.body
                const post = posts[0]

                cy.get(detailBtn).then(els => els[0].click())
                cy.location('search').then(searchStr => {
                    const params = new URLSearchParams(searchStr)

                    expect(params.get('_id')).to.equal(post._id)
                    expect(params.get('title')).to.equal(post.title)
                })
            })
        })
    })
})