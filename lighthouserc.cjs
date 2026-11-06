/** @type {import('@lhci/cli').LHCI.ServerCommand.Options} */
module.exports = {
  ci: {
    collect: {
      url: [
        `${process.env.QA_BASE_URL ?? 'http://127.0.0.1:3000'}/`,
        `${process.env.QA_BASE_URL ?? 'http://127.0.0.1:3000'}/products/`,
        `${process.env.QA_BASE_URL ?? 'http://127.0.0.1:3000'}/products/the-isle-cheats/`,
        `${process.env.QA_BASE_URL ?? 'http://127.0.0.1:3000'}/blog/the-isle-cheats-features-guide/`,
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        formFactor: 'mobile',
        screenEmulation: { mobile: true },
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.98 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
      },
    },
  },
};
