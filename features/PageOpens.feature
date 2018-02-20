#
# This is a sample Gherkin test to go with the sample site created by
# Angular CLI with the new site command.
#
Feature: Running Cucumber with Protractor
    As a user of Protractor
    I should be able to use Cucumber
    In order to run my E2E tests

    Scenario: Protractor and Cucumber Test
        Given I am on the homepage
        Then I should see "Welcome to app!"
