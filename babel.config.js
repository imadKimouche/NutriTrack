module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          // This needs to be mirrored in tsconfig.json
          '#': './src',
          api: './src/api',
          assets: './src/assets',
          atoms: './src/atoms',
          components: './src/components',
          hooks: './src/hooks',
          screens: './src/screen',
          store: './src/store',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
