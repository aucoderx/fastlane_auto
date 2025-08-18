# 安卓

## 打包
* 缓存方案：

## 单测
* 用于模拟用户操作，进行截屏。
* 使用 AI 生成，待补充。
* app.json 插件 需要添加 "@config-plugins/detox", 之后在进行prebuild，才能进行UI测试。

## 截屏
* 方案一：使用 screengrab 进行截屏。
    * bundle 和 brew 安装的fastlane存在差异
    * brew 的 screengrab 参数更多，不需要依赖一些老的权限。可直接运行截屏。
    * bundle  的 screengrab 需要在打的包申请一些权限，且模拟器需要在 root 模式才可截屏成功。

* 方案二：使用detox来跑截屏
    * 优势：
        * 安卓，IOS可以用同一套代码。
        * 方便搭配expo源码。
        * 无需考虑 screengrab 的权限问题。
    * 缺点：
        * 每一个项目需要启动一个 Metro Bundler 服务器，否则在模拟器无法打开APP。需要考虑将 Metro Bundler 服务器集成进APP


## 证书
* 使用 genkeypair 生成。
* alise name： KEY_ALIAS
* store password： KEYSTORE_PASSWORD
* key password: KEY_PASSWORD
* 地区默认中国。

## 模拟器
* 需安装安卓SDK，使用 adb 进行管理，运行截屏前需启动模拟器。否则detox 会自动打开一个默认的模拟器。

----

# IOS

## 打包

## 单测

## 截屏

## 证书

## 模拟器