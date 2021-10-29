module.exports = {
  reactStrictMode: true,
  webpack: (config, {defaultLoaders, isServer, webpack}) => {
    config.experiments = { topLevelAwait: true };
    return config;
  },
}
