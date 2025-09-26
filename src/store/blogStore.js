import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getAllPostsMeta, loadMarkdownPost } from '../utils/markdownLoader'

// 默认的博客文章数据（作为后备）
const defaultBlogPosts = [
  {
    slug: 'responsive-design-guide',
    title: '响应式设计完全指南：从移动优先到现代CSS布局',
    date: '2024-01-28',
    excerpt: '深入探讨响应式设计的核心理念、实现技巧和最佳实践，帮助开发者构建真正适配各种设备的现代网站。',
    content: '响应式设计是一种网页设计方法，旨在创建能够自动适应不同设备屏幕尺寸和分辨率的网站。无论用户使用手机、平板还是桌面设备访问，网站都能提供最佳的浏览体验。',
    category: '前端开发',
    tags: ['响应式设计', 'CSS', '移动优先', '布局', '前端'],
    author: 'adventure',
    readingTime: '8分钟'
  },
  {
    slug: 'javascript-async-guide',
    title: 'JavaScript异步编程深度解析：从回调到Async/Await',
    date: '2024-01-22',
    excerpt: '全面解析JavaScript异步编程的演进历程，从传统回调到Promise，再到现代的Async/Await语法。',
    content: 'JavaScript是单线程语言，异步编程对于处理耗时操作（如网络请求、文件读写）至关重要。从回调函数到Promise，再到Async/Await，JavaScript异步编程不断演进。',
    category: '前端开发',
    tags: ['JavaScript', '异步编程', 'Promise', 'Async/Await', '回调'],
    author: 'adventure',
    readingTime: '10分钟'
  },
  {
    slug: 'react-performance-optimization',
    title: 'React性能优化实战指南：从理论到实践',
    date: '2024-01-15',
    excerpt: '深入探讨React应用性能优化的各种策略和技巧，包括组件优化、状态管理、代码分割等实用方法。',
    content: 'React作为现代前端开发的主流框架，性能优化是构建高质量应用的关键。本文将从组件层面到应用层面，全面介绍React性能优化的最佳实践。',
    category: '前端开发',
    tags: ['React', '性能优化', '前端', '组件', '状态管理'],
    author: 'adventure',
    readingTime: '12分钟'
  }
]

// 初始状态
const initialState = {
  posts: [], // 文章列表
  filteredPosts: [], // 筛选后的文章列表
  categories: [], // 分类列表
  tags: [], // 标签列表
  selectedCategory: '', // 选中的分类
  selectedTags: [], // 选中的标签
  searchQuery: '', // 搜索查询
  viewMode: 'grid', // 视图模式
  loading: false, // 加载状态
  currentPost: null, // 当前文章
  relatedPosts: [], // 相关文章
  isMarkdownLoaded: false // 是否已加载Markdown文件
}

// 创建 store
export const useBlogStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // 初始化文章数据
      initializePosts: async () => {
        console.log('开始初始化文章数据...')
        set({ loading: true })
        
        try {
          // 尝试从Markdown文件加载文章
          console.log('尝试从Markdown文件加载文章...')
          const markdownPosts = await getAllPostsMeta()
          
          console.log(`从Markdown加载到 ${markdownPosts.length} 篇文章`)
          
          if (markdownPosts.length > 0) {
            // 成功加载Markdown文件，使用这些数据
            console.log('成功加载Markdown文件，使用这些数据')
            const categories = [...new Set(markdownPosts.map(post => post.category))]
            const allTags = [...new Set(markdownPosts.flatMap(post => post.tags || []))]
            
            set({ 
              posts: markdownPosts,
              filteredPosts: markdownPosts,
              categories,
              tags: allTags,
              isMarkdownLoaded: true
            })
            console.log('文章数据初始化完成')
          } else {
            // Markdown文件加载失败，使用默认数据
            console.log('Markdown文件加载失败，使用默认数据')
            set({ 
              posts: defaultBlogPosts,
              filteredPosts: defaultBlogPosts,
              categories: ['前端开发', '后端开发', '数据科学'],
              tags: ['响应式设计', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', '数据分析'],
              isMarkdownLoaded: false
            })
          }
        } catch (error) {
          console.error('初始化文章数据失败:', error)
          // 出错时也使用默认数据
        }
        
        set({ loading: false })
      },

      // 设置搜索查询
      setSearchQuery: (query) => {
        set({ searchQuery: query })
        get().filterPosts()
      },

      // 设置分类筛选
      setSelectedCategory: (category) => {
        set({ selectedCategory: category })
        get().filterPosts()
      },

      // 设置标签筛选
      setSelectedTags: (tags) => {
        set({ selectedTags: tags })
        get().filterPosts()
      },

      // 切换视图模式
      toggleViewMode: () => {
        set((state) => ({ viewMode: state.viewMode === 'grid' ? 'list' : 'grid' }))
      },

      // 筛选文章
      filterPosts: () => {
        const { posts, searchQuery, selectedCategory, selectedTags } = get()
        
        let filtered = posts

        if (searchQuery) {
          filtered = filtered.filter(post => 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
          )
        }

        if (selectedCategory) {
          filtered = filtered.filter(post => post.category === selectedCategory)
        }

        if (selectedTags.length > 0) {
          filtered = filtered.filter(post => 
            selectedTags.some(tag => post.tags.includes(tag))
          )
        }

        set({ filteredPosts: filtered })
      },

      // 根据slug获取文章
      getPostBySlug: async (slug) => {
        const { posts, isMarkdownLoaded } = get()
        
        // 首先尝试从已加载的文章列表中找到文章基本信息
        let post = posts.find(p => p.slug === slug)
        
        // 如果找到了文章且是从Markdown加载的，尝试加载完整的Markdown内容
        if (post && isMarkdownLoaded) {
          try {
            const markdownPost = await loadMarkdownPost(slug)
            if (markdownPost) {
              post = {
                ...post,
                content: markdownPost.content
              }
            }
          } catch (error) {
            console.error(`加载Markdown内容失败 (${slug}):`, error)
          }
        }
        
        if (post) {
          const relatedPosts = posts
            .filter(p => p.category === post.category && p.slug !== slug)
            .slice(0, 3)
          
          set({ 
            currentPost: post,
            relatedPosts 
          })
        }
        
        return post
      },

      // 清除筛选
      clearFilters: () => {
        set({
          searchQuery: '',
          selectedCategory: '',
          selectedTags: []
        })
        get().filterPosts()
      },

      // 获取所有分类
      getCategories: () => {
        return [...new Set(get().posts.map(post => post.category))]
      },

      // 获取所有标签
      getAllTags: () => {
        const allTags = get().posts.flatMap(post => post.tags)
        return [...new Set(allTags)]
      },

      // 获取最新文章
      getLatestPosts: (limit = 6) => {
        return get().posts
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, limit)
      },

      // 获取标签（兼容Home组件）
      getTags: () => {
        const allTags = get().posts.flatMap(post => post.tags)
        return [...new Set(allTags)]
      }
    }),
    {
      name: 'blog-storage',
      partialize: (state) => ({
        viewMode: state.viewMode,
        selectedCategory: state.selectedCategory,
        selectedTags: state.selectedTags,
        searchQuery: state.searchQuery
      })
    }
  )
)