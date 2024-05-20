describe('Visits Homepage as web crawler', () => {
  it('Visits the Home page as a web crawler', () => {
    cy.visit('/', {
      headers: {
        'User-Agent': 'googlebot'
      }
    });

    cy.get('.home')
      .should('not.exist')

    cy.get('.web-crawler').
      should('exist')
  })
})