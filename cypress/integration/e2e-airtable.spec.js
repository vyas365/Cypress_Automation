import { dropdownOption, menuOption, uniqueEmailData } from '../support/command'

import selectors from '../support/selectors'
import testData from '../support/testData'

context('Airtable Automation Assignment', () => {
    let url = 'https://airtable.com/'
    before(() => {
        cy.visit(url)
    })

    it('Should successfully create an account', () => {
        cy.get(selectors.signup, { timeout: 12000 }).click()
        cy.signupAccount(testData.fullName, testData.password)
        cy.get('body').then(($body) => {
            if ($body.find(selectors.selectAnOption).length > 0) {
                cy.get(selectors.selectAnOption).click()
                dropdownOption(1).click()
            } else {
                menuOption(1).click()
            }
            cy.get(selectors.continueToNextStep).click()
            cy.get(selectors.skipSetup).click()
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
        cy.login(url, testData.loginUserName, testData.password)
        cy.veryifyBaseCreation(uniqueEmailData())
        cy.get(selectors.shareBase).click()
        cy.get(selectors.addBaseCollaborator(2)).click()
        cy.get(selectors.inviteCollaborators).type(testData.inviteCollaborators)
        cy.get(selectors.selectMenuButton).click()
        dropdownOption(2).click()
        cy.get(selectors.sendInviteButton).click()
    })
    it('Should successfully share the base with a collaborator by using “Invite by email” flow', () => {
        cy.xpath(selectors.inviteByLink).click()
        cy.xpath(selectors.inviteByEmail).click()
        cy.get(selectors.verifyBaseCollaborator).should('be.visible')
        cy.get(`[alt='${testData.inviteCollaborators}']`).should('be.visible')
    })

    it('Should successfully verify newly collaborated user email and Editor role are displayed under “Base Collaborators', () => {
        cy.get('body').then(($body) => {
            if ($body.find(selectors.verifyBaseCollaborator).length > 0) {
                cy.xpath(selectors.editorRole).click()
                dropdownOption(2).click()
                cy.xpath(selectors.editorRole).should('have.text', 'Editor')
            } else {
                throw new Error(
                    'Base Collaborator with Editor Role is not found'
                )
            }
        })
    })
    after(() => cy.end())
})
