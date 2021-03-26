import { dropdownOption, menuOption } from '../support/command'
import selectors from '../support/selectors.js'

context('Airtable Automation Assignment', () => {
    before(() => {
        cy.visit('https://airtable.com/')
    })

    it('Should successfully create an account', () => {
        cy.get(selectors.signup, { timeout: 12000 }).click()
        cy.signupAccount('ghi', 'welcome12345')
        cy.get('body').then(($body) => {
            if ($body.find(selectors.selectAnOption).length > 0) {
                cy.get(selectors.selectAnOption).click()
                dropdownOption(1).click()
                cy.get(selectors.continueToNextStep).click()
                cy.get(selectors.skipSetup).click()
            } else {
                menuOption(1).click()
                cy.get(selectors.continueToNextStep).click()
                cy.get(selectors.skipSetup).click()
            }
        })
        cy.get('body').then(($body) => {
            if ($body.find(selectors.haveExistingProject).length > 0) {
                cy.xpath(selectors.skipExistingProject).click()
                cy.get(selectors.goHome).click()
            }
        })
        cy.xpath(selectors.myFirstWorkSpace).should('be.visible')
    })
    it('Should successfully create a base', () => {
        cy.login('https://airtable.com', 'vv11@test.com', '12345678')
        cy.veryifyBaseCreation('test1')
        cy.get(selectors.shareBase).click()
        cy.get(selectors.addBaseCollaborator(2)).click()
        cy.get(selectors.inviteCollaborators).type('ads@test.com')
        cy.get(selectors.selectMenuButton).click()
        dropdownOption(2).click()
        cy.get(selectors.sendInviteButton).click()
    })
    it('Should successfully share the base with a collaborator by using “Invite by email” flow', () => {
        cy.xpath(selectors.inviteByLink).click()
        cy.xpath(selectors.inviteByEmail).click()
        cy.get(selectors.verifyBaseCollaborator).should('be.visible')
        cy.get("[alt='ads@test.com']").should('be.visible')
    })

    it('Should successfully verify newly collaborated user email and Editor role are displayed under “Base Collaborators', () => {
        cy.get('body').then(($body) => {
            if ($body.find(selectors.verifyBaseCollaborator).length > 0) {
                cy.xpath(selectors.editorRole).click()
                dropdownOption(2).click()
                cy.xpath(selectors.editorRole).should('have.text', 'Editor')
            } else {
                throw new Error('Base Collaborator is not found')
            }
        })
    })
    after(() => cy.end())
})
