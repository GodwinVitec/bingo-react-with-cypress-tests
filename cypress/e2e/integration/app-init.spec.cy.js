describe('App initialization', () => {
  context('Home Page Contents on First Visit', () => {
    it('Loads the Home page with the correct content', () => {
      cy.visit('/');

      cy.get('.home')
        .should('exist')

      cy.get('.breadcrumbs')
        .should('exist')

      cy.get('header')
        .should('exist')
        .find('.root-nav h1')
        .should('contain', 'Jobarouter')

      cy.get('.root-nav a')
        .contains('Home')
        .should('have.class', 'active')
    })
  })
});