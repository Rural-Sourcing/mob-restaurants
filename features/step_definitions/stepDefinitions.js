/*
 * Step Definitions File
 *
 * This file defines the tests underlying the Gherkin Scenarios and assertions
 */

/*
 * Import Chai assertion library
 *
 * @see http://chaijs.com/
 */
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

// Setup Cucumber.
var {Then, When, Given} = require('cucumber');

/*
 * Begin Test methods
 */

Given('I am on the homepage', function (callback) {
  browser.get('/').then(callback);
});

Then('I should see {stringInDoubleQuotes}', function (stringInDoubleQuotes, callback) {
  expect(browser.getPageSource()).to.eventually.include(stringInDoubleQuotes).and.notify(callback);
});

