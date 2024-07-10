import { defineConfig } from 'cypress';

module.exports = defineConfig({
    chromeWebSecurity: false,
    env: {},
    e2e: {
        baseUrl: 'https://www.saucedemo.com',
        viewportWidth: 1920,
        viewportHeight: 1080,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
