describe('App initialization', () => {
  context('Verify that the app does appropriate routing' , () => {
    it('Routes to the login screen if the token does not exist in the local storage', () => {
      cy.clearAllLocalStorage();

      cy.visit('/')

      cy.url().should('include', '/login')
    })

    it('Routes to the login screen if the token exists but the user is not authenticated', () => {
      localStorage.setItem('auth_token', 'some-token');

      cy.visit('/')

      cy.wait(2000)
        .url()
        .should('include', '/login')
    })

    it('Routes to the dashboard if the user is authenticated', () => {
      let authUrls = {}

      const apiBaseUrl = Cypress.env('REACT_APP_API_BASE_URL') ?? 'http://18.188.14.183/bingo_api/public/api'

      cy.fixture('auth/auth-urls')
        .then((urls) => {
          authUrls = urls;
        })

      cy.fixture('auth/valid-user')
        .then((data) => {
          cy.request('POST', `${apiBaseUrl}/login`, data).then((response) => {
            localStorage.setItem('auth_token', response.body.data.token);
          })
        });

      cy.visit('/')

      cy.url()
        .should('include', '/dashboard')

      cy.get('.dashboard')
        .should('exist')
    })
  })
});