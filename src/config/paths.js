// 路径配置 - 统一管理所有资源路径
export const PATHS = {
  // 图片路径配置
  images: {
    // 文章图片基础路径
    posts: '/images/posts/',
    // 通用图片路径
    common: '/images/',
    // 头像和logo路径
    profile: '/images/profile/',
    // 图标路径
    icons: '/images/icons/'
  },
  
  // 其他资源路径
  assets: {
    // CSS文件路径
    css: '/assets/css/',
    // JS文件路径
    js: '/assets/js/',
    // 字体文件路径
    fonts: '/assets/fonts/'
  }
}

// 获取文章图片的完整路径
export const getPostImagePath = (imageName) => {
  if (!imageName) return ''
  
  // 如果已经是完整路径，直接返回
  if (imageName.startsWith('http') || imageName.startsWith('/')) {
    return imageName
  }
  
  // 确保图片名称不包含路径前缀
  const cleanImageName = imageName.split('/').pop()
  
  // 返回完整的图片路径
  return `${PATHS.images.posts}${cleanImageName}`
}

// 获取通用图片的完整路径
export const getCommonImagePath = (imageName) => {
  if (!imageName) return ''
  
  // 如果已经是完整路径，直接返回
  if (imageName.startsWith('http') || imageName.startsWith('/')) {
    return imageName
  }
  
  // 确保图片名称不包含路径前缀
  const cleanImageName = imageName.split('/').pop()
  
  // 返回完整的图片路径
  return `${PATHS.images.common}${cleanImageName}`
}