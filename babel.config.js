module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets:
          process.env.NODE_ENV === 'test'
            ? { node: 'current' }
            : '> 0.25%, not dead',
        useBuiltIns: 'entry',
        corejs: 3
      }
    ]
  ]
}
