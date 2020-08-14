/* eslint-disable cypress/no-unnecessary-waiting */
/*eslint-env node, cypress */

describe('E2E - Navbar', () => {
    
    describe('mobile', () => {
        const menuBtn = '.menu-btn'
        beforeEach(() => {
            cy.viewport('iphone-6+')
            cy.visit('localhost:8080')
            cy.server()
            cy.route({
                method: 'GET',
                url: 'api/user/checkToken',
                response: {
                    success: false
                }
            })
        })
        it('renders menu button', () => {
            cy.get(menuBtn).should('be.visible')
        })
        it('slides nav into view', () => {
            cy.get(menuBtn).click()
            cy.wait(500)
            const drawerNav = '.drawer-nav'
            cy.get(drawerNav).should('be.visible')
        })
        it('navigates to correct pages', () => {
            cy.get(menuBtn).click()
            cy.wait(500)
            const navItems = '.drawer-nav > .nav-item'
            cy.get(navItems).then($items => {
                $items.each((idx, el) => {
                    cy.get(el).click()
                    cy.get(el).find('.label').then(label => {
                        cy.title().then(title => {
                            expect(title.includes(label.text().trim())).to.be.true
                        })
                    })
                    cy.get(menuBtn).click()
                    cy.wait(500)
                })
            })
        })
    })
    describe('desktop', () => {
        before(() => {
            cy.visit('localhost:8080')
        })
        it('renders all nav items (without account tab)', () => {
            const navItems = '.nav-items > .nav-item'
            cy.get(navItems).then($items => expect($items.length).to.equal(3))

            const joinUs = '.nav-actions > .action-btn'
            cy.get(joinUs).then($btn => expect($btn.text().trim()).to.equal('Join us'))
        })
        it('navigates to correct pages', () => {
            const navItems = '.nav-items > .nav-item'
            cy.get(navItems).then($items => {
                $items.each((idx, el) => {
                    cy.get(el).click()
                    cy.get(el).find('.label').then(label => {
                        cy.title().then(title => {
                            expect(title.includes(label.text().trim())).to.be.true
                        })
                    })
                })
            })

            const joinUs = '.nav-actions > .action-btn'
            cy.get(joinUs).click()
            cy.location('pathname').should('eq', '/new-account')
            cy.get(joinUs).then($btn => expect($btn.text().trim()).to.equal('Login'))
            cy.get(joinUs).click()
            cy.location('pathname').should('eq', '/login')
        })
    })
})