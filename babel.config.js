// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets:
					process.env.NODE_ENV === 'test'
					  ? { node: 'current' } // for Jest / Tests
					  : '> 0.25%, not dead' // for Webbrowser (Webpack)
      }
    ]
  ]
}
