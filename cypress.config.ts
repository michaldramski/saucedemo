import { defineConfig } from 'cypress';
import 'dotenv/config';

module.exports = defineConfig({
    chromeWebSecurity: false,
    env: {
        grepFilterSpec: true,
    },
    e2e: {
        baseUrl: 'https://www.saucedemo.com',
        viewportWidth: 1920,
        viewportHeight: 1080,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setupNodeEvents(on, config) {},
    },
});
