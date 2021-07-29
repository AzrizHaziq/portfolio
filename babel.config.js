module.exports = function (api) {
  const isServer = api.caller(caller => (caller ? caller.isServer : undefined))
  const isCallerDevelopment = api.caller(caller => (caller ? caller.isDev : undefined))

  const presets = [
    [
      'next/babel',
      {
        'preset-react': {
          importSource: !isServer && isCallerDevelopment ? '@welldone-software/why-did-you-render' : 'react',
        },
      },
    ],
  ]

  return { presets }
}
