const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
//figures out the directory bby itself
const config = getDefaultConfig(__dirname);

// Force lucide-react-native to map directly to its stable build file
config.resolver.alias = {
  'lucide-react-native': path.resolve(__dirname, 'node_modules/lucide-react-native/dist/cjs/lucide-react-native.js'),
};

// Safely add file extension fallbacks
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs'];

module.exports = config;
