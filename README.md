# Zhaoping UI 前端项目

Zhaoping UI 是使用 Vue 3 和 Vite 构建的前端项目，提供快速启动、轻量化开发体验以及高性能的构建方式，帮助前端开发人员高效搭建界面和功能。

---

## 技术栈与工具

- **核心框架**：Vue 3.5.13
- **构建工具**：Vite 6.0.11
- **状态管理**：Pinia 3.0.1
- **UI 库**：Naive UI 2.41.0、Element Plus 2.9.4
- **接口请求**：Axios 1.8.1
- **可视化工具**：ECharts 5.6.0、vue-echarts 7.0.3
- **3D 工具库**：three.js 0.173.0
- **路由管理**：vue-router
- **图标库**：@vicons/ionicons5 0.13.0
- **代码辅助工具**：unplugin-auto-import、unplugin-vue-components、vite-plugin-vue-devtools

---

## 项目结构说明

```
zhaoping-ui 
├── .idea # IDE 配置文件 
├── node_modules # 项目依赖库 
├── src # 核心源码目录 
├── .env.development # 开发环境配置文件 
├── .gitignore # git忽略配置文件 
├── index.html # 项目入口 HTML 文件 
├── jsconfig.json # JavaScript 配置文件，提供代码提示和路径映射 
├── package.json # 项目依赖与脚本配置 
├── vite.config.js # Vite 构建与开发配置文件 
├── README.md # 项目说明文件（当前文件） 
└── yarn.lock # yarn依赖锁定文件
```

---

## 项目运行指南

项目基于 Yarn 管理，推荐使用 Yarn 包管理工具安装和运行：

**安装依赖：**

```sh
yarn install
```

**运行开发环境（支持热更新与实时编译）：**

```sh
yarn dev
```

**项目打包与生产环境优化：**

```sh
yarn build
```

---

## 自定义配置

如需自定义项目的 Vite 配置，请参考 [Vite 官方配置文档](https://vite.dev/config/)。

---

## 开发规范建议

推荐使用 [VSCode 编辑器](https://code.visualstudio.com/) 配合 [Volar 插件](https://marketplace.visualstudio.com/items?itemName=Vue.volar)，注意禁用 Vetur 插件，以确保开发环境稳定性和性能表现最佳。

---

如对项目有其他疑问，请及时联系技术负责人或提交 issue，与开发团队沟通交流。