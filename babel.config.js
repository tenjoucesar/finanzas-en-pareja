module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            providers: "./Providers",
            screens: "./Screens",
            utils: "./Utils",
            components: "./Components"
          },
        },
      ],
    ],
  };
};
