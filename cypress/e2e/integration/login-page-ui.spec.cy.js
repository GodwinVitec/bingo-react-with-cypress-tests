describe('App initialization', () => {
  context('Verify that the app starts with the login screen' , () => {
    it.only('Verifies the Login Form', () => {
      cy.visit('/login')

      cy.get('.home')
        .should('exist')
        .and('have.class', 'o-page')
        .find('.o-page__card')
        .should('exist')
        .find('.c-card').as('formHolder')
        .should('exist')
        .and('have.class', 'c-card--center')
        .find('form').as('loginForm')
        .should('exist')

      cy.get('@loginForm')
        .should('have.attr', 'action', '/login')
        .and('have.attr', 'method', 'post')

      cy.get('@loginForm')
        .find('div.c-field')
        .then(($fields) => {
          expect($fields).to.have.length(2)
        })

      // The first c-field must contain the email label and input properly classed
      cy.get('@loginForm')
        .find('div.c-field').first()
        .find('label.c-field__label')
        .should('exist')
        .and('have.text', 'Email Address')

      cy.get('@loginForm')
        .find('div.c-field').first()
        .find('input.c-input')
        .should('exist')
        .and('have.attr', 'type', 'email')
        .and('have.attr', 'name', 'user')
        .and('have.attr', 'placeholder', 'e.g. adam@sandler.com')
        .and('have.attr', 'required')

      // The second c-field must contain the password label and input properly classed
      cy.get('@loginForm')
        .find('div.c-field').eq(1)
        .find('label.c-field__label')
        .should('exist')
        .and('have.text', 'Password')

      cy.get('@loginForm')
        .find('div.c-field').eq(1)
        .find('input.c-input')
        .should('exist')
        .and('have.attr', 'type', 'password')
        .and('have.attr', 'name', 'password')
        .and('have.attr', 'placeholder', '********')
        .and('have.attr', 'required')

      // There must be a hidden input with name role and value "Partner"
      cy.get('@loginForm')
        .find('input[type="hidden"]')
        .should('exist')
        .and('have.attr', 'name', 'role')
        .and('have.attr', 'value', 'Partner')

      // There must be a submit button properly classed with value login
      cy.get('@loginForm')
        .find('button[type="submit"]')
        .should('exist')
        .and('have.class', 'c-btn c-btn--fullwidth c-btn--info')
        .and('have.text', 'Login')

      // Last section of card should carry forgot password and create new account links
      cy.get('@formHolder')
        .find('.form-footer').as('formFooter')
        .should('exist')
        .and('have.class', 'ss_btn d-flex mt-10')

      cy.get('@formFooter')
        .find('.u-text-left')
        .should('exist')
        .and('have.class', 'mr-auto')
        .find('a')
        .should('exist')
        .contains('Forgot Password?')

      cy.get('@formFooter')
        .find('.u-text-right')
        .should('exist')
        .find('a')
        .should('exist')
        .contains('Create new account?')
    })
  })
});