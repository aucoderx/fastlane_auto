const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withDebuggableVariants(config) {
  return withAppBuildGradle(config, (config) => {
    let gradle = config.modResults.contents;

    gradle = gradle.replace(
      /react\s*\{([\s\S]*?)\}/,
      (match, inner) => {
        // 如果已存在，就不重复加
        if (!inner.includes('debuggableVariants')) {
          return `react {\n    debuggableVariants = []\n${inner}}`;
        }
        return match;
      }
    );

    config.modResults.contents = gradle;
    return config;
  });
};