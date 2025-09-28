# Blog

基于React 18 + Vite + TailwindCSS构建的现代化单页应用博客，支持Markdown文章渲染、响应式设计和深色模式。

## 🚀 特性

- **现代化UI设计**：简洁美观的界面，支持深色/浅色模式切换
- **响应式布局**：完美适配移动端、平板和桌面设备
- **Markdown支持**：原生渲染Markdown格式的技术文章
- **搜索功能**：支持关键词、分类、标签多维度搜索
- **动画效果**：使用Framer Motion实现流畅的页面过渡和交互动画
- **性能优化**：基于Vite构建，开发体验流畅，生产构建优化
- **SEO友好**：支持服务端渲染配置，有利于搜索引擎优化

## 📁 项目结构

```

```

## 🛠️ 技术栈


## 📦 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 开发模式运行

```bash
npm run dev
```

访问 `http://localhost:3000` 查看应用

### 3. 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录

### 4. 预览构建结果

```bash
npm run preview
```

## 🚀 部署指南

### 部署到GitHub Pages

✅ **已配置自动部署** - 项目包含完整的GitHub Actions工作流

1. **推送到main分支**：
```bash
git add .
git commit -m "更新内容"
git push origin main
```

2. **配置GitHub Pages**：
   - 进入仓库 Settings > Pages
   - Source 选择 "GitHub Actions"
   - 工作流会自动运行并部署

3. **访问您的博客**：
   - 部署完成后，访问 `https://[username].github.io`
   - 无需手动构建，完全自动化

### 🔧 故障排除

**权限错误（403）**：
- 确保仓库 Settings > Actions > General > Workflow permissions 设置为 "Read and write permissions"

**页面空白或资源加载失败**：
- 检查 vite.config.js 中的 base 路径配置为 `./`
- 确认所有资源路径使用相对路径
- 查看浏览器控制台错误信息


## 🎨 自定义配置

### 修改主题颜色

编辑 `tailwind.config.js` 文件中的颜色配置：

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',  // 主色调
    600: '#2563eb',  // 悬停色
    900: '#1e3a8a',
  }
}
```

### 修改字体

在 `index.html` 中更新Google Fonts链接，或在 `tailwind.config.js` 中配置字体：

```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['Fira Code', 'monospace'],
}
```

### 添加新页面

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

**享受你的现代化博客之旅！** 🎉