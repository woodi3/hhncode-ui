/* eslint-disable cypress/no-unnecessary-waiting */
/*eslint-env node, cypress */

describe('E2E - Authentication', () => {
    const AUTH_ENDPOINT = 'api/user/login'
    const AUTH_POST = '@authPOST'
    const loginModel = {
        email: 'woodawilliam@gmail.com',
        password: '123456'
    }
    describe('Login', () => {
        const userEmailClass = 'input.user-email'
        const userPasswordClass = 'input.user-password'
        const loginBtnClass = '.login-btn'
        before(() => {
            localStorage.clear()
            cy.visit('localhost:8080/login')
        })

        describe('handle incorrect credentials', () => {
            beforeEach(() => {
                cy.server()
                cy.route({
                    method: 'POST',
                    url: AUTH_ENDPOINT,
                    status: 401,
                    response: {
                        success: false,
                    }
                }).as(AUTH_POST.substring(1))
                clearInput(cy, userEmailClass)
                clearInput(cy, userPasswordClass)
            })
            it('disables button', () => {
                cy.get(userEmailClass).type('some wrong stuff')
                cy.get(userPasswordClass).type('some wrong pass')
                cy.get(loginBtnClass).then(loginBtnEl => {
                    expect(loginBtnEl.prop('disabled')).to.be.true
                })
            })
            it('shows error toast', () => {
                const toastClass = '.zen-toast.bg-danger'
                cy.get(userEmailClass).type('alex@gmail.com')
                cy.get(userPasswordClass).type('some wrong pass')
                cy.get(loginBtnClass).click()
                cy.wait(AUTH_POST)
                cy.get(AUTH_POST).then(() => {
                    cy.get(toastClass).then(toast => {
                        expect(toast.length > 0).to.be.true
                    })
                })
            })
        })
        describe('handle correct credentials', () => {
            let retUser
            beforeEach(() => {
                cy.server()
                cy.route({
                    method: 'POST',
                    url: AUTH_ENDPOINT,
                }).as(AUTH_POST.substring(1))
                
            })
            describe('correct authentication', () => {
                beforeEach(() => {
                    clearInput(cy, userEmailClass)
                    clearInput(cy, userPasswordClass)
                })
                it('authenticates correctly', () => {
                    cy.get(userEmailClass).type(loginModel.email)
                    cy.get(userPasswordClass).type(loginModel.password)
                    cy.get(loginBtnClass).click()
                    cy.wait(AUTH_POST)
                    cy.get(AUTH_POST).then(({ response }) => {
                        const { success, user } = response.body
                        expect(success).to.be.true
                        retUser = user
                        // token = access_token
                    })
                    cy.location('pathname').should('eq', '/account-settings')
                })
            })
            describe('Account View', () => {
                const nameInputClass = 'input.name'
                const emailInputClass = 'input.email'
                const checkboxClass = 'div.checkbox > input'

                it('initializes user info correctly', () => {
                    cy.get(nameInputClass).then(nameInput => {
                        expect(nameInput.val()).to.equal(retUser.name)
                    })
                    cy.get(emailInputClass).then(emailInput => {
                        expect(emailInput.val()).to.equal(retUser.email)
                    })
                    cy.get(checkboxClass).then(checkbox => {
                        expect(checkbox.prop('checked')).to.equal(retUser.notify)
                    })
                })
                it('disables save button if info does not change', () => {
                    clearInput(cy, nameInputClass)
                    cy.get(nameInputClass).type(retUser.name + ' some more stuff')
                    clearInput(cy, nameInputClass)
                    cy.get(nameInputClass).type(retUser.name)
                    cy.get('.save-btn').then(saveBtnEl => {
                        expect(saveBtnEl.prop('disabled')).to.be.true
                    })
                    clearInput(cy, emailInputClass)
                    cy.get(emailInputClass).type(retUser.name + ' some more stuff')
                    clearInput(cy, emailInputClass)
                    cy.get(emailInputClass).type(retUser.email)
                    cy.get('.save-btn').then(saveBtnEl => {
                        expect(saveBtnEl.prop('disabled')).to.be.true
                    })
                })
                it('logs out', () => {
                    cy.get('.more-settings .zen-accordion-header').click({force: true})
                    cy.get('.sign-out-btn').click()
                    cy.location('pathname').should('eq', '/home')
                })
            })
        })
    })
})

function clearInput(cy, inputClass){
    cy.get(inputClass).type('{selectall}')
    cy.get(inputClass).type('{backspace}')
}