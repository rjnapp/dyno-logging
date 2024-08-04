module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Custom rule examples

    // Type must be one of the specified values
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'security',
        'revert',
        'ci',
        'perf',
        'build',
      ],
    ],

    // Make the scope mandatory
    'scope-empty': [2, 'never'],
    // Define allowed scopes (optional)
    'scope-enum': [
      2,
      'always',
      [
        'config',
        'docs',
        'test-cases',
        'dyno-logging',
        'security',
        'performance',
        'release-workflow',
        'build-workflow',
        'formatter',
        'transport',
      ],
    ],
    // Subject must be capitalized
    'subject-case': [2, 'always', ['sentence-case']],

    // Ensure the subject length is not too long
    'subject-max-length': [2, 'always', 100],
  },
}
