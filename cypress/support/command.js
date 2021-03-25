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

// this is for temp purpose to generate unique string for email

export const uniqueEmailData = () => {
    return Math.random().toString(36).substring(7)
}
export const dropdownOption = (index) => {
    return cy.get(
        `[class='hdropdown selectMenuList menu'] >li:nth-child(${index})`,
        { timeout: 6000 }
    )
}
export const menuOption = (index) => {
    return cy.get(
        `[class='flex flex-wrap mxn1 justify-between']>div:nth-child(${index})`,
        { timeout: 5000 }
    )
}
Cypress.Commands.add('veryifyBaseCreation', (baseName) => {
    cy.get(selectors.createBase).click()
    cy.get("[type='text']").type(baseName)
    cy.get(selectors.homeButton).click()
    cy.get(`a[aria-label=${baseName}]`).should('be.visible')
    cy.get(`a[aria-label=${baseName}]`).click({ multiple: true, force: true })
})

Cypress.Commands.add('signupAccount', (fullname, password) => {
    return cy.get('body').then(($body) => {
        if ($body.find("[class*='signupInputField']").length > 0) {
            cy.get("[type='email']").type(`${uniqueEmailData()}@test.com`)
            cy.get("[type='button']").click()
            cy.get("[name='fullName']").type(fullname)
            cy.get("[name='password']", { timeout: 10000 }).type(password)
            cy.get("[value='Continue']").click()
        } else if ($body.find("[name='firstName']").length > 0) {
            cy.get("[name='firstName']").type('abc')
            cy.get("[name='lastName']").type('def')
            cy.get("[type='email']").type(`${uniqueEmailData()}@test.com`)
            cy.get("[type='password']").type(password)
            cy.get("[value='Sign up for free']").click()
        }
    })
})

Cypress.Commands.add('login', (url, email, password) => {
    cy.visit(url)
    cy.get("[href='/login'][class*='big']").click()
    cy.get("[type='email']").type(email)
    cy.get("[type='password']").type(password)
    cy.get("[value='Sign in']").click()
})
