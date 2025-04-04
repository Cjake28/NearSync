const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);

// Add polyfills for Node.js modules required by MQTT.js
defaultConfig.resolver.extraNodeModules = {
  stream: require.resolve("stream-browserify"),
  buffer: require.resolve("buffer"),
  url: require.resolve("url"),
  events: require.resolve("events"),
};

module.exports = withNativeWind(defaultConfig, { input: "./global.css" });
