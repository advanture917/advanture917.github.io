# 图片管理规范

## 概述
本文档定义了项目中图片资源的管理规范，确保在GitHub Pages部署环境下图片能够正确显示。

## 目录结构

### 图片存储位置
所有图片资源统一存储在 `public/images/` 目录下，按用途分类：

```
public/images/
├── posts/          # 文章相关图片
├── profile/        # 头像和个人资料图片
├── icons/          # 图标和UI元素
└── common/         # 通用图片资源
```

### 文章图片规范
- **存储位置**: `public/images/posts/`
- **命名规则**: `image-{编号}.png` (如: `image-11.png`)
- **引用路径**: `/images/posts/image-11.png`

## Markdown文件中的图片引用

### 标准格式
在Markdown文件中，图片引用必须使用绝对路径：

```markdown
![图片描述](/images/posts/image-11.png)
```

### 路径转换
系统会自动处理以下路径转换：
- 遗留路径 `../../assets/images/image.png` → `/images/posts/image.png`
- 标准路径 `/images/posts/image.png` → 保持不变

## 代码实现

### 路径配置 (`src/config/paths.js`)
```javascript
export const PATHS = {
  images: {
    posts: '/images/posts/',
    common: '/images/',
    profile: '/images/profile/',
    icons: '/images/icons/'
  }
}

export const getPostImagePath = (imageName) => {
  // 自动处理图片路径
}
```

### 图片组件 (`src/pages/BlogPost.jsx`)
```javascript
import { getPostImagePath } from '../config/paths.js'

const CustomImage = ({ src, alt }) => {
  const processedSrc = getPostImagePath(src)
  return <img src={processedSrc} alt={alt} />
}
```

### Markdown处理 (`src/utils/markdownLoader.js`)
```javascript
function convertImagePaths(content) {
  // 处理标准路径 /images/posts/
  // 处理遗留路径 ../../assets/images/
}
```

## 部署说明

### 构建过程
1. Vite构建时会将 `public/` 目录内容复制到 `dist/` 目录
2. 确保 `vite.config.js` 中 `publicDir: 'public'` 配置正确
3. 所有图片资源会被正确复制到部署目录

### GitHub Pages访问
- 个人站点: `https://{username}.github.io/images/posts/image.png`
- 项目站点: `https://{username}.github.io/{project}/images/posts/image.png`

## 最佳实践

### 添加新图片
1. 将图片文件放入对应分类目录
2. 遵循命名规范
3. 在Markdown中使用正确的绝对路径

### 迁移旧图片
1. 从 `assets/images/` 移动到 `public/images/posts/`
2. 更新所有相关的Markdown文件路径
3. 测试所有图片是否正常显示

### 调试技巧
- 使用浏览器开发者工具检查图片URL
- 检查网络请求状态码
- 查看控制台日志中的路径处理信息

## 常见问题

### 404错误
- 检查图片文件是否存在于 `public/images/` 目录
- 确认路径是否正确（区分大小写）
- 验证构建后是否存在于 `dist/images/` 目录

### 路径问题
- 确保使用绝对路径（以 `/` 开头）
- 避免使用相对路径（如 `./images/`）
- 检查vite配置中的 `publicDir` 设置

## 更新记录
- 2025-09-28: 创建标准化图片管理规范
- 2025-09-28: 实现路径统一管理和自动转换