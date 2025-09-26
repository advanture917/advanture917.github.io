# React Blog - GitHub Pages 部署指南

## 项目说明
这是一个使用React + Vite构建的现代单页博客应用，完全替代了原来的Jekyll博客。

## 本地开发
```bash
npm install    # 安装依赖
npm run dev    # 启动开发服务器 (localhost:3000)
```

## 部署到GitHub Pages

### 自动部署（推荐）
项目已配置GitHub Actions工作流，每次推送到main分支时会自动部署：

1. 确保仓库设置中启用了GitHub Pages
2. 在仓库的 Settings > Pages 中，Source选择 "GitHub Actions"

### 手动部署
```bash
npm run build      # 构建项目
npm run deploy     # 部署到GitHub Pages
```

## GitHub Pages 配置

### 仓库设置
1. 进入仓库的 Settings > Pages
2. Source 选择 "Deploy from a branch"
3. Branch 选择 "gh-pages" 分支
4. 点击 Save

### 自定义域名（可选）
如果需要使用自定义域名：
1. 在仓库根目录创建 `CNAME` 文件，写入你的域名
2. 在仓库的 Settings > Pages 中配置自定义域名

## 项目结构
```
├── src/                    # React源代码
│   ├── components/         # 组件
│   ├── pages/             # 页面组件
│   └── store/             # 状态管理
├── dist/                   # 构建输出目录
├── .github/workflows/      # GitHub Actions配置
└── vite.config.js         # Vite配置
```

## 注意事项
- 所有资源路径已配置为相对路径，确保在GitHub Pages上正确加载
- 构建输出目录为 `dist/`
- 已配置GitHub Actions自动部署工作流

## 🔧 故障排除

### 权限错误（403）
如果遇到权限错误，请检查：
1. 确保仓库 Settings > Actions > General > Workflow permissions 设置为 "Read and write permissions"
2. 检查工作流文件中的权限配置是否正确

### 部署失败
1. 检查构建日志中的错误信息
2. 确保package.json中的构建脚本正确
3. 验证dist目录是否正确生成

### 页面空白或资源加载失败
1. 检查vite.config.js中的base路径配置
2. 确认所有资源路径使用相对路径
3. 检查浏览器控制台中的错误信息