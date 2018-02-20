// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  seleniumAddress: 'http://localhost:4444/wd/hub/',
  specs: ['features/*.feature'],
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
     args: [ "--headless", "--disable-gpu", "--window-size=1280,1024" ]
   }
  },
  //directConnect: true,
  baseUrl: 'http://localhost:8080/',

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {require: ['features/step_definitions/stepDefinitions.js']},

};
