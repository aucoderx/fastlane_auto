# 资讯类 APP Demo

这是一个基于 Expo + Tamagui 的 React Native 项目，实现了一个资讯类 APP 的 demo 版本。

## 项目特性

- 🚀 基于 Expo Router 的现代化导航系统
- 🎨 使用 Tamagui 组件库，提供一致的设计语言
- 📱 支持 iOS 和 Android 平台
- 🔄 支持下拉刷新和上拉加载更多
- 📖 响应式布局，适配不同屏幕尺寸
- 🔍 支持关键词搜索功能（集成在页面标题栏）
- 📺 多频道内容切换（头条、精选、国际、财经、科技）

## 项目结构

```
app/
├── _layout.tsx              # 根布局配置
├── (tabs)/                  # 底部 Tabs 导航组（主要页面）
│   ├── _layout.tsx         # Tabs 布局配置
│   ├── index.tsx           # 资讯列表页面（第一个 tab）
│   ├── card-list.tsx       # 卡片视图页面（第二个 tab）
│   └── user-center.tsx     # 用户中心页面（第三个 tab）
├── (detail)/                # 详情页面组
│   └── detail.tsx          # 资讯详情页面
├── (drawer)/                # Drawer 导航组（保留备用）
│   └── _layout.tsx         # Drawer 布局配置
├── components/              # 可复用组件
│   └── SearchHeader.tsx    # 搜索栏组件
└── contexts/                # React Context
    └── SearchContext.tsx   # 搜索状态管理
```

## 主要页面

### 1. 资讯列表页面 (List) - 默认首页
- **Logo 区域**：页面标题栏中显示 "Very News" logo，与搜索框在同一行
- **搜索功能**：搜索栏集成在页面标题栏中，支持根据关键字搜索内容
- **频道切换**：二级频道切换tab栏（头条、精选、国际、财经、科技）
- **列表样式**：左文右图的两栏形式展示，图片宽高比4:3
- **内容优化**：文字内容最长不超过三行，底部显示作者和发布时间
- **交互功能**：支持下拉刷新、滚动加载更多、频道切换数据刷新

### 2. 卡片视图页面 (CardList)
- 每行两个卡片的网格布局
- 每个卡片包含上图下文
- 支持下拉刷新和上拉加载
- 点击卡片跳转到详情页面

### 3. 用户中心页面 (UserCenter)
- 用户基本信息展示（头像、名称、简介）
- 工具模块（收藏、历史、已赞）
- 常用功能（安全中心、字号设置、帮助反馈、退出登录）

### 4. 资讯详情页面 (Detail)
- 展示完整的资讯详情（标题、作者、图文正文）
- 包含底部操作栏（点赞、收藏、分享、评论）
- 支持标签显示和阅读量统计

## 技术栈

- **框架**: React Native + Expo
- **导航**: Expo Router
- **UI 组件**: Tamagui
- **状态管理**: React Hooks + Context API
- **类型检查**: TypeScript
- **图标**: @expo/vector-icons

## 开发说明

### 安装依赖
```bash
npm install
# 或
pnpm install
```

### 启动开发服务器
```bash
npm start
# 或
expo start
```

### 运行到设备
```bash
# iOS
npm run ios

# Android
npm run android
```

## 数据模拟

项目使用模拟数据来展示功能，数据存储在 `utils/mockData.ts` 文件中：

- `channels`: 频道数据（头条、精选、国际、财经、科技）
- `generateMockListData(page, channel)`: 根据频道生成列表页面的模拟数据
- `generateMockCardData(page)`: 生成卡片页面的模拟数据
- `getMockDetailData(id, width)`: 获取详情页面的模拟数据

## 功能特性

### 搜索功能
- **位置**：集成在页面标题栏中，节省页面空间
- **功能**：支持标题、摘要、作者的关键词搜索
- **状态管理**：使用 React Context 管理搜索状态
- **实时过滤**：输入关键词实时过滤显示结果
- **清除功能**：搜索框带有清除按钮

### 频道切换
- 5个预设频道：头条、精选、国际、财经、科技
- 点击频道自动刷新对应内容
- 频道状态保持，支持无限滚动加载

### 列表优化
- 左文右图的布局设计
- 图片宽高比4:3，圆角显示
- 文字内容最多三行，超出部分省略
- 底部浅色小字显示作者和发布时间
- 每项之间用浅色横线分割，适当的内边距

## 自定义配置

### 修改主题
在 `tamagui.config.ts` 中配置主题和样式。

### 添加新页面
1. 在 `app/(tabs)/` 目录下创建新的页面文件
2. 在 `_layout.tsx` 中添加对应的 tab 配置
3. 更新导航图标和标题

### 修改数据源
替换 `utils/mockData.ts` 中的模拟数据函数，连接到真实的 API 接口。

### 添加新频道
在 `utils/mockData.ts` 的 `channels` 数组中添加新的频道配置。

### 搜索栏样式
在 `components/SearchHeader.tsx` 中自定义搜索栏的外观和交互。

## 注意事项

- 确保 Expo SDK 版本兼容性
- 在真机上测试时注意网络权限
- 图片使用 Picsum 服务，仅用于演示
- 所有交互功能都是模拟实现，需要根据实际需求开发
- 应用启动时默认显示 tabs 页面，而不是 drawer 页面
- 搜索功能使用 Context API 进行状态管理，确保组件间通信
- 搜索栏集成在标题栏中，提供更好的用户体验和空间利用

## 许可证

MIT License 