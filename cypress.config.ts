import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,feature}',
    baseUrl: 'https://www.nobl9.com/',
    chromeWebSecurity: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    defaultCommandTimeout: 6000
  }
})
