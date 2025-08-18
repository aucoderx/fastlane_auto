#!/bin/bash
set -e

ACTION=${1:-beta}

case $ACTION in
    test)
        echo "运行 Android 测试..."
        bundle exec fastlane android test
        ;;
    build)
        echo "运行 Android 打包..."
        bundle exec fastlane android build
        ;;
    build_debug)
        echo "运行 Android debug 打包..."
        bundle exec fastlane android build_debug
        ;;
    build_aab)
        echo "运行 Android 打包..."
        bundle exec fastlane android build_aab
        ;;
    screengrab)
        echo "运行 Android 截屏..."
        bundle exec fastlane android e2e_screenshots
        ;;
    screengrabs)
        echo "运行 Android 截屏..."
        bundle exec fastlane android e2e_screenshots_all_platform
        ;;
    full_screenshot_flow)
        echo "运行 Android模拟器， 进行截屏..."
        bundle exec fastlane android full_screenshot_flow avd:"Pixel_6_API_34"
        ;;
    internal)
        echo "发布 Android 内部测试版本..."
        bundle exec fastlane android internal
        ;;
    alpha)
       echo "发布 Android Alpha 版本..."
       bundle exec fastlane android alpha
       ;;
    beta)
       echo "发布 Android Beta 版本..."
       bundle exec fastlane android beta
       ;;
    release)
        echo "发布 Android 正式版本..."
        bundle exec fastlane android release
        ;;
    *)
        echo "用法: $0 {test|build|build_aab|screenshots|full_screenshot_flow|internal|alpha|beta|release}"
        exit 1
        ;;
esac