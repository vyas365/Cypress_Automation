// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import selectors from './selectors'

// this function is for temp purpose to generate unique string for email
export const uniqueEmailData = () => {
    return Math.random().toString(36).substring(7)
}
export const dropdownOption = (index) => {
    return cy.get(selectors.dropdownMenu(index), { timeout: 6000 })
}
export const menuOption = (index) => {
    return cy.get(selectors.menuOption(index), { timeout: 5000 })
}
Cypress.Commands.add('veryifyBaseCreation', (baseName) => {
    cy.get(selectors.createBase).click()
    cy.get(selectors.inputTypeText).type(baseName)
    cy.get(selectors.homeButton).click()
    cy.get(`a[aria-label=${baseName}]`).should('be.visible')
    cy.get(`a[aria-label=${baseName}]`).click({ multiple: true, force: true })
})

Cypress.Commands.add('signupAccount', (fullname, password) => {
    return cy.get('body').then(($body) => {
        if ($body.find(selectors.signupInputType).length > 0) {
            cy.get(selectors.inputTypeEmail).type(
                `${uniqueEmailData()}@test.com`
            )
            cy.get(selectors.inputTypeButton).click()
            cy.get(selectors.fullName).type(fullname)
            cy.get(selectors.inputPassword, { timeout: 10000 }).type(password)
            cy.get(selectors.continue).click()
        } else if ($body.find(selectors.firstName).length > 0) {
            cy.get(selectors.firstName).type('abc')
            cy.get(selectors.lastName).type('def')
            cy.get(selectors.inputTypeEmail).type(
                `${uniqueEmailData()}@test.com`
            )
            cy.get(selectors.password).type(password)
            cy.get(selectors.signupForFree).click()
        }
    })
})

Cypress.Commands.add('login', (url, email, password) => {
    cy.visit(url)
    cy.get(selectors.loginButton).click()
    cy.get(selectors.inputTypeEmail).type(email)
    cy.get(selectors.password).type(password)
    cy.get(selectors.signInButton).click()
})
