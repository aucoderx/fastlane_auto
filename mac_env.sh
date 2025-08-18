#!/bin/bash

# === 常量设置 ===
RUBY_VERSION="3.4.5"
JAVA_VERSION="17"  # Temurin 的版本

# === 检查 Brew 是否安装 ===
if ! command -v brew &> /dev/null; then
  echo "Homebrew 未安装，请先手动安装 Homebrew。"
  exit 1
fi

echo "✅ Homebrew 已安装"


# gradle 配置
GRADLE_PROPERTIES="$HOME/.gradle/gradle.properties"
TLS_CONFIG="systemProphttps.protocols=TLSv1.2,TLSv1.3"

# 如果文件不存在就创建
if [ ! -f "$GRADLE_PROPERTIES" ]; then
    echo "🔧 gradle.properties 不存在，正在创建..."
    mkdir -p "$(dirname "$GRADLE_PROPERTIES")"
    echo "$TLS_CONFIG" > "$GRADLE_PROPERTIES"
    echo "✅ 已添加 TLS 配置到新文件中。"
else
    # 检查文件中是否已有 TLS 配置
    if grep -q "^$TLS_CONFIG" "$GRADLE_PROPERTIES"; then
        echo "✅ 已存在 TLS 配置，无需修改。"
    else
        echo "🔧 未检测到 TLS 配置，正在追加..."
        echo "" >> "$GRADLE_PROPERTIES"
        echo "$TLS_CONFIG" >> "$GRADLE_PROPERTIES"
        echo "✅ TLS 配置已追加。"
    fi
fi


# 检查 .npmrc 文件是否存在
if [ ! -f .npmrc ]; then
  echo ".npmrc 文件不存在，正在创建..."
  echo "node-linker=hoisted" > .npmrc
  echo "已创建 .npmrc 并添加 node-linker=hoisted"
  exit 0
fi

# 检查 .npmrc 中是否已有 node-linker=hoisted
if grep -q "^node-linker=hoisted" .npmrc; then
  echo ".npmrc 中已存在 node-linker=hoisted"
else
  echo "node-linker=hoisted" >> .npmrc
  echo "已添加 node-linker=hoisted 到 .npmrc"
fi

# === 检查并安装 Java (Temurin) ===
if ! command -v java &> /dev/null; then
  echo "⚠️ 未检测到 Java，开始安装 temurin@${JAVA_VERSION}..."
  brew install --cask temurin@$JAVA_VERSION
else
  echo "✅ Java 已安装：$(java -version 2>&1 | head -n 1)"
fi

# === 设置 JAVA 环境变量 ===
JAVA_HOME_PATH=$(/usr/libexec/java_home -v${JAVA_VERSION})
if ! grep -q "JAVA_HOME=" ~/.bashrc; then
  echo "🔧 设置 JAVA_HOME 环境变量..."
  echo "" >> ~/.bashrc
  echo "# Java 环境变量" >> ~/.bashrc
  echo "export JAVA_HOME=$JAVA_HOME_PATH" >> ~/.bashrc
  echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
  echo "✅ JAVA_HOME 添加到 ~/.bashrc"
else
  echo "✅ JAVA_HOME 已存在于 ~/.bashrc"
fi

# === 检查 Ruby 版本 ===
RUBY_INSTALLED_VERSION=$(ruby -v 2>/dev/null | awk '{print $2}' || echo "")
if [[ "$RUBY_INSTALLED_VERSION" != "$RUBY_VERSION" ]]; then
  echo "⚠️ Ruby 版本不匹配或未安装，安装 Ruby ${RUBY_VERSION}..."
  brew install ruby@$RUBY_VERSION
  RUBY_BIN_PATH="$(brew --prefix ruby@$RUBY_VERSION)/bin"
  if ! grep -q "$RUBY_BIN_PATH" ~/.bashrc; then
    echo "🔧 设置 Ruby 路径到 ~/.bashrc..."
    echo "" >> ~/.bashrc
    echo "# Ruby 路径设置" >> ~/.bashrc
    echo "export PATH=\"$RUBY_BIN_PATH:\$PATH\"" >> ~/.bashrc
  fi
else
  echo "✅ Ruby ${RUBY_VERSION} 已安装"
fi

# === 检查 bundler 是否安装 ===
if ! gem list bundler -i > /dev/null; then
  echo "⚠️ 未安装 bundler，正在安装..."
  gem install bundler
else
  echo "✅ bundler 已安装"
fi



echo "✅ 所有设置完成。请运行 'source ~/.bashrc' 使更改生效。"
