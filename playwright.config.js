// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout : 30000,
  expect: {
    timeout: 5000
  },
  reporter : 'html',
  use: {
    browserName : 'chromium',
    headless : false,
    screenshot : 'on',
    trace: 'retain-on-failure' //off, on, retain-on-failure
    
  },
 
});
module.exports = config

