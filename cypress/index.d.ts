/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    navigateToHomePage(): Chainable<any>
    getById(selector: string, args?: any): Chainable<JQuery<HTMLElement>>
    getByIdLike(selector: string, args?: any): Chainable<JQuery<HTMLElement>>
    getIframeBody(iframeSelector: string): Chainable<JQuery<HTMLElement>>
    getIframeElem(contentSelector: string): Chainable<JQuery<HTMLElement>>
    fillFormFromFixture(fixturePath: string): Chainable<Element>
  }
}
