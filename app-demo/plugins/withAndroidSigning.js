const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withAndroidSigning(config) {
  return withAppBuildGradle(config, (config) => {
    config.modResults.contents = config.modResults.contents.replace(
      /signingConfigs {[^}]*}/,
        `signingConfigs {
            debug {
                keyAlias 'my-key-alias'
                keyPassword 'autocoder123'
                storeFile file('')
                storePassword 'autocoder123'
            }
            release {
                keyAlias 'my-key-alias'
                keyPassword 'autocoder123'
                storeFile file('../../keystore/my-release-key.keystore')
                storePassword 'autocoder123'
            }`
    );

    // 修改 buildTypes.release.signingConfig -> signingConfigs.release
    config.modResults.contents = config.modResults.contents.replace(
      /signingConfig\s+signingConfigs\.debug/g,
      "signingConfig signingConfigs.release"
    );
    return config;
  });
};
