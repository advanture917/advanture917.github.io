# 现代化SPA博客

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
page/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 可复用组件
│   │   ├── ArticleCard.jsx # 文章卡片组件
│   │   ├── Header.jsx      # 头部导航组件
│   │   ├── Footer.jsx      # 页脚组件
│   │   ├── TagCloud.jsx    # 标签云组件
│   │   └── Layout.jsx      # 主布局组件
│   ├── pages/              # 页面组件
│   │   ├── Home.jsx        # 首页
│   │   ├── BlogPost.jsx    # 文章详情页
│   │   ├── Archive.jsx     # 文章归档页
│   │   ├── Search.jsx      # 搜索页面
│   │   └── About.jsx       # 关于页面
│   ├── store/              # 状态管理
│   │   ├── blogStore.js    # 博客数据状态
│   │   └── themeStore.js   # 主题状态管理
│   ├── App.jsx             # 主应用组件
│   ├── main.jsx            # 应用入口
│   └── index.css           # 全局样式
├── _posts/                 # 原始Markdown文章（迁移用）
├── package.json            # 项目依赖配置
├── vite.config.js          # Vite配置
├── tailwind.config.js      # TailwindCSS配置
└── README.md              # 项目说明
```

## 🛠️ 技术栈

- **前端框架**: React 18
- **构建工具**: Vite 5
- **路由管理**: React Router v6
- **状态管理**: Zustand
- **样式框架**: TailwindCSS
- **动画库**: Framer Motion
- **Markdown渲染**: react-markdown
- **图标库**: Lucide React

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

## 📝 内容迁移指南

### 从Jekyll迁移Markdown文章

1. **复制文章文件**：将 `_posts/` 目录下的所有 `.markdown` 文件保留

2. **更新文章数据**：在 `src/store/blogStore.js` 中更新文章数据：

```javascript
const blogPosts = [
  {
    slug: '文章URL别名',
    title: '文章标题',
    date: '2024-01-15',
    excerpt: '文章摘要',
    content: '完整的Markdown内容',
    tags: ['标签1', '标签2'],
    category: '技术分类',
    author: '作者名',
    readingTime: '5分钟阅读',
    image: '/assets/images/post-image.jpg' // 可选
  },
  // 更多文章...
]
```

3. **处理图片资源**：将文章中的图片复制到 `public/assets/images/` 目录

4. **更新文章链接**：确保文章中的内部链接使用新的路由格式

### 文章格式要求

- 使用标准Markdown语法
- 支持代码块高亮
- 支持图片、链接、列表等常用元素
- 建议添加文章摘要和标签便于搜索

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
   - 部署完成后，访问 `https://[username].github.io/page/`
   - 无需手动构建，完全自动化

### 🔧 故障排除

**权限错误（403）**：
- 确保仓库 Settings > Actions > General > Workflow permissions 设置为 "Read and write permissions"

**页面空白或资源加载失败**：
- 检查 vite.config.js 中的 base 路径配置为 `./`
- 确认所有资源路径使用相对路径
- 查看浏览器控制台错误信息

### 手动部署（备用方案）
如果自动部署失败，可以手动部署：
```bash
npm run build
npm run deploy
```

### 部署到其他平台

- **Netlify**: 直接连接GitHub仓库，自动构建部署
- **Vercel**: 支持自动部署，提供全球CDN加速
- **阿里云OSS**: 上传静态文件到对象存储服务
- **腾讯云COS**: 类似阿里云的对象存储方案

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

1. 在 `src/pages/` 目录创建新页面组件
2. 在 `src/App.jsx` 中添加路由配置
3. 在导航组件中添加对应链接

## 🔧 开发建议

### 代码规范

- 使用ESLint进行代码检查
- 遵循React Hooks最佳实践
- 组件命名使用PascalCase
- 文件命名使用camelCase

### 性能优化

- 使用React.memo优化组件渲染
- 合理使用useMemo和useCallback
- 图片资源进行压缩优化
- 启用代码分割和懒加载

### SEO优化

- 配置meta标签和OpenGraph
- 添加结构化数据(JSON-LD)
- 优化页面加载速度
- 生成sitemap.xml

## 📞 支持

如有问题或建议，欢迎通过以下方式联系：

- 提交GitHub Issue
- 发送邮件到: contact@example.com
- 关注技术博客获取更新

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

**享受你的现代化博客之旅！** 🎉