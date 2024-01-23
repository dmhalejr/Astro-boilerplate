---
layout: '@/templates/BasePost.astro'
title: Jest Custom Reporter
description: null
pubDate: 2019-02-25T22:12:03.284Z
---

In this blog post we will dive into handling custom actions before, during, or after your test runs in Jest.

For example, my team needed to find a way to get [Sauce Labs](https://saucelabs.com) updated with the appropriate test data to enhance traceability on all our end to end tests but we wanted an ability to define out a system to extend past this first offering.

Jest allows you to hook into lifecycle methods like `onTestStart`, `onTestResult`, and `onRunComplete` ([as well as others](https://github.com/facebook/jest/blob/master/packages/jest-reporters/src/types.ts))

We leverage [TypeScript](http://www.typescriptlang.org/) for our automation framework and reworked the example custom reporter to work with the Jest types like so:

```javascript
class SauceLabReporter {
  constructor(public globalConfig: jest.GlobalConfig, private options: any) {}

  public onTestStart(test: jest.Test) {
   // runs on start
  }

  public onTestResult(test: jest.Test, testResult: jest.TestResult, results: jest.AggregatedResult) {
    // runs on result (skipped/passed/failed/pending)
  }

  public onRunComplete(contexts: Set<jest.Context>, results: jest.AggregatedResult) {
    // runs after every test is complete
  }
}

module.exports = SauceLabReporter;
```

After creating the skeleton it was just understanding the structure of the objects (`jest.AggregatedResult`, `jest.Test`, and `jest.TestResult`) and then hooking it in properly to our jest configuration. (_custom reporters can be leveraged locally and published as npm packages themselves_)

Like has been before, the implications moving forward for this custom reporter can be easily expanded upon to not only handle test reporter functionality but do further custom downstream actions.

### Helpful Links

- [Configure Jest - Reporters](https://jestjs.io/docs/en/configuration#reporters-array-modulename-modulename-options)