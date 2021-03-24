
describe('Airtable Automation Assignment', () => {

  before(() => {

    cy.visit('https://airtable.com/')
  })


  const airtableOption = index => `[class='hdropdown selectMenuList menu'] >li:nth-child${index}`

  it('Should successfully create an account', () => {

    const signup = cy.get("a[href='/login']+[href='/signup']", { timeout: 10000 })
    signup.click();

    cy.get('body').then(($body) => {
      if ($body.find("[class*='signupInputField']").length > 0) {
        //evaluates as true
        cy.get("[type='email']").type('ac2@test.com')
        cy.get("[type='button']").click();
      }
      else if ($body.find("[name='firstName']").length > 0) {
        cy.get("[name='firstName']").type('abc')
        cy.get("[name='lastName']").type('def')
        cy.get("[type='email']").type('abc1@test.com')
        cy.get("[type='password']").type('welcome12345')
        cy.get("input[type='submit']").click()    // //sign up for free
        cy.get(airtableOption(1)).click();
      }
    })
  })
  after(() => cy.end())
})
