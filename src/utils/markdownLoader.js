import matter from 'gray-matter'
import { Buffer } from 'buffer'

// 在浏览器环境中提供Buffer polyfill
if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = Buffer
}

// 使用Vite的import.meta.glob来加载src/posts目录下的Markdown文件
const markdownFiles = import.meta.glob('/src/posts/*.md', { 
  query: '?raw',
  import: 'default',
  eager: false
})

// 转换Markdown中的图片路径以适应GitHub Pages
function convertImagePaths(content) {
  // 匹配Markdown图片语法 ![alt text](../../assets/images/image.png)
  const imageRegex = /!\[([^\]]*)\]\((\.\.\/\.\.\/assets\/images\/[^)]+)\)/g
  
  return content.replace(imageRegex, (match, altText, imagePath) => {
    // 提取图片文件名
    const imageName = imagePath.split('/').pop()
    // GitHub Pages需要仓库名作为基础路径
    const basePath = '/page'
    return `![${altText}](${basePath}/assets/images/${imageName})`
  })
}

// 读取Markdown文件并解析front matter
export async function loadMarkdownPost(slug) {
  try {
    const filePath = `/src/posts/${slug}.md`
    const loadFile = markdownFiles[filePath]
    
    if (!loadFile) {
      console.error(`Markdown文件未找到: ${filePath}`)
      console.error('可用的文件路径:', Object.keys(markdownFiles))
      return null
    }
    
    console.log(`正在加载文件: ${filePath}`)
    const markdownContent = await loadFile()
    console.log(`文件加载成功，内容长度: ${markdownContent.length}`)
    
    // 使用gray-matter解析front matter和内容
    const { data: frontMatter, content } = matter(markdownContent)
    console.log(`解析front matter成功:`, frontMatter)
    
    // 转换图片路径以适应GitHub Pages
    const processedContent = convertImagePaths(content)
    
    // 返回解析后的数据
    return {
      ...frontMatter,
      content: processedContent,
      slug
    }
  } catch (error) {
    console.error(`加载Markdown文件失败 (${slug}):`, error)
    return null
  }
}

// 获取所有文章的slug列表
export async function getAllPostSlugs() {
  try {
    const slugs = Object.keys(markdownFiles).map(filePath => {
      // 从文件路径提取slug
      const match = filePath.match(/\/src\/posts\/(.*)\.md$/)
      return match ? match[1] : null
    }).filter(Boolean)
    
    return slugs
  } catch (error) {
    console.error('获取文章列表失败:', error)
    return []
  }
}

// 获取所有文章的基本信息（用于列表显示）
export async function getAllPostsMeta() {
  try {
    console.log('开始获取文章元数据...')
    console.log('可用的markdown文件:', Object.keys(markdownFiles))
    
    const slugs = await getAllPostSlugs()
    console.log('获取到的文章slugs:', slugs)
    
    const posts = []
    
    for (const slug of slugs) {
      console.log(`正在加载文章: ${slug}`)
      const post = await loadMarkdownPost(slug)
      if (post) {
        console.log(`成功加载文章: ${post.title}`)
        posts.push({
          slug: post.slug,
          title: post.title,
          date: post.date,
          excerpt: post.excerpt,
          category: post.category,
          tags: post.tags || [],
          author: post.author,
          readingTime: post.readingTime
        })
      } else {
        console.log(`加载文章失败: ${slug}`)
      }
    }
    
    // 按日期排序（最新的在前）
    posts.sort((a, b) => new Date(b.date) - new Date(a.date))
    
    console.log(`总共加载了 ${posts.length} 篇文章`)
    return posts
  } catch (error) {
    console.error('获取文章元数据失败:', error)
    return []
  }
}