describe('Tech challenge', () => {
  it('Test scenario', () => {
    // navigate to Home Page and assert that logo is visible
    cy.navigateToHomePage()
    cy.getById('hs_cos_wrapper_site_logo').should('be.visible')

    // Select Resources in the main menu and click on the “Nobl9 Blog” item.
    cy.getByIdLike('hs_cos_wrapper_module').contains('Resources').click()
    cy.get('.nobl9__mega-menu--sub-item').contains('Nobl9 Blog').click()
    cy.url().should('include', 'resources')
    cy.getByIdLike('hs_cos_wrapper_module').should('contain.text', 'Blog')

    // Choose the latest post displayed in the “All Posts” section and click on the “Learn More” button.
    cy.get('.blog-index__post-timestamp')
      .then(($timestamps) => {
        const timestamps = $timestamps.toArray().map((el) => {
          const datetime = el.getAttribute('datetime')
          return datetime ? new Date(datetime).getTime() : 0
        })
        const latestTimestamp = Math.max(...timestamps)
        const latestIndex = timestamps.findIndex(
          (timestamp) => timestamp === latestTimestamp
        )
        return $timestamps.eq(latestIndex)
      })
      .parent()
      .find('.blog-index__post-button')
      .click()

    // On the post page, click the “Request a Demo” button on the page header
    cy.getById('header-trial').contains('Request a Demo').click()
    cy.getIframeElem('button[name="Submit"]').should('be.visible')
    // Fill out the details in the “Request a Demo” form. Don’t click submit! Instead, close the modal after completing the form.
    cy.fillFormFromFixture('demo.json')
    cy.fixture('demo.json').then((data) => {
      const fields = [
        { selector: '#firstname-input', value: data.firstName },
        { selector: '#lastname-input', value: data.lastName },
        { selector: '#email-input', value: data.email },
        { selector: '#company-input', value: data.companyName },
        { selector: '#jobtitle-input', value: data.jobTitle }
      ]

      fields.forEach((field) => {
        cy.getIframeElem(field.selector).should('have.value', field.value)
      })
    })

    // Close the modal
    cy.getIframeElem('#interactive-close-button').click()
  })
})
