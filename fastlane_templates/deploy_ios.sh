#!/bin/bash
set -e

ACTION=${1:-beta}

case $ACTION in
    test)
        echo "运行 iOS 测试..."
        bundle exec fastlane ios test
        ;;
    build_only)
        echo "运行 iOS build_only..."
        bundle exec fastlane ios build_only
        ;;
    beta)
        echo "发布 iOS Beta 版本..."
        bundle exec fastlane ios beta
        ;;
    screengrab)
        echo "发布 iOS Beta 版本..."
        bundle exec fastlane ios e2e_screenshots
        ;;
    release)
        echo "发布 iOS 正式版本..."
        bundle exec fastlane ios release
        ;;
    certificates)
        echo "更新 iOS 证书..."
        bundle exec fastlane ios certificates
        ;;
    *)
        echo "用法: $0 {test|beta|release|certificates}"
        exit 1
        ;;
esac