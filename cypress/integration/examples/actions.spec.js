describe('Airtable Automation Assignment', () => {
  before(() => {
    cy.visit('https://airtable.com/')
  })

  const dropdownOption = (index) =>
    `[class='hdropdown selectMenuList menu'] >li:nth-child(${index})`
  // this is for temp purpose to generate unique string for email
  const uniqueEmailData = () => {
    return Math.random().toString(36).substring(7)
  }
  const menuOption = (index) =>
    `[class='flex flex-wrap mxn1 justify-between']>div:nth-child(${index})`


  it(
    'Should successfully create an account',
    () => {
      const signup = cy.get("a[href='/login']+[href='/signup']", {
        timeout: 12000,
      })
      signup.click()

      cy.get('body').then(($body) => {
        if ($body.find("[class*='signupInputField']").length > 0) {
          cy.get("[type='email']").type(
            `${uniqueEmailData()}@test.com`
          )
          cy.get("[type='button']").click()
          cy.get("[name='fullName']").type('ghi')
          cy.get("[name='password']", { timeout: 10000 }).type(
            'welcome1234'
          )
          cy.get("[value='Continue']").click()
        } else if ($body.find("[name='firstName']").length > 0) {
          cy.get("[name='firstName']").type('abc')
          cy.get("[name='lastName']").type('def')
          cy.get("[type='email']").type(
            `${uniqueEmailData()}@test.com`
          )
          cy.get("[type='password']").type('welcome12345')
          cy.get("[value='Sign up for free']").click()
        }
      })
      cy.get('body').then(($body) => {
        if ($body.find("[aria-label='Select an option']").length > 0) {
          cy.get("[aria-label='Select an option']").click()
          cy.get(dropdownOption(1)).click()
          cy.get("[aria-label='Continue to next step']").click()
          cy.get("[aria-label='Skip workspace setup step']", {timeout:5000}).click()
        } else {
          cy.get(
            menuOption(1), {timeout:5000} 
          ).click()
          cy.get("[aria-label='Continue to next step']").click()
          cy.get("[aria-label='Skip workspace setup step']").click()
        }
      })
      cy.get('body').then(($body) => {
        if ($body.find("[class='display']").length > 0) {
          cy.get(
            "[class='pointer quieter link-unquiet display huge mr3 mt4 pb3']",
          ).click()
          cy.get("[class*='self-end bottom-0 right']").click()
        }
      })
    }
  )
  after(() => cy.end())
})
