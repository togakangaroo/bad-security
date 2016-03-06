module.exports = wallaby => ({
  files: [
    'data/db.db',
    'src/**/*.js',
  ],

  tests: [
    'test/**/*.js',
  ],
  env: {
    type: 'node',
  },
  compilers: {
  },
})
