/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('navigateToHomePage', () => {
  cy.visit('/')
})

Cypress.Commands.add('getById', (selector, ...args) => {
  return cy.get(`#${selector}`, ...args)
})

Cypress.Commands.add('getByIdLike', (selector, ...args) => {
  return cy.get(`[id*="${selector}"]`, ...args)
})

Cypress.Commands.add('getIframeElem', (contentSelector) => {
  const iframeSelector = 'iframe[data-test-id="interactive-frame"]'
  return cy
    .get(iframeSelector)
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap)
    .find(contentSelector)
})

Cypress.Commands.add('fillFormFromFixture', (fixturePath) => {
  cy.fixture(fixturePath).then((data) => {
    cy.getIframeElem('#firstname-input').type(data.firstName)
    cy.getIframeElem('#lastname-input').type(data.lastName)
    cy.getIframeElem('#email-input').type(data.email)
    cy.getIframeElem('#company-input').type(data.companyName)
    cy.getIframeElem('#jobtitle-input').type(data.jobTitle)
  })
})
