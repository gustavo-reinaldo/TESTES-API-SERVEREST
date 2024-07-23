const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000/',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mocha/', // Diretório onde os relatórios serão gerados
      overwrite: false,
      html: true,
      json: true
    }
  }
});
