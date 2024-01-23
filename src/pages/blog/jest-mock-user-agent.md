---
layout: '@/templates/BasePost.astro'
title: Jest Mock UserAgent
description: null
pubDate: 2019-12-21T22:12:03.284Z
---

How does one mock `global.navigator.userAgent` for use inside Jest? <br /> Let's get to it!

# Create configuration method

Create a setup file or append this method to an existing setup file:

```javascript
Object.defineProperty(
  window.navigator,
  'userAgent',
  ((value) => ({
    get() {
      return value
    },
    set(v) {
      value = v
    },
  }))(window.navigator['userAgent'])
)
```

# Setup into Jest

Reference the setup file in the Jest configuration. Below highlights, the standalone configuration file type.

```javascript
  setupFiles: ["<rootDir>/ROUTE_TO_SETUP_FILE"],
```

# Profit

Start leveraging your mocking abilities!

```javascript
test('simple test', () => {
  global.navigator.userAgent = 'bond james bond'
  expect(global.navigator.userAgent).toBe('bond james bond')
})
```

### Helpful Links

- [Example Repo](https://github.com/dmhalejr/jest-user-agent-mock-example)