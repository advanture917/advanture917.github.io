import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 博客文章数据
const blogPosts = [
  {
    slug: 'responsive-design-guide',
    title: '响应式设计完全指南：从移动优先到现代CSS布局',
    date: '2024-01-28',
    excerpt: '深入探讨响应式设计的核心理念、实现技巧和最佳实践，帮助开发者构建真正适配各种设备的现代网站。',
    content: '响应式设计是一种网页设计方法，旨在创建能够自动适应不同设备屏幕尺寸和分辨率的网站。无论用户使用手机、平板还是桌面设备访问，网站都能提供最佳的浏览体验。',
    category: '前端开发',
    tags: ['响应式设计', 'CSS', '移动优先', '布局', '前端'],
    author: 'Sky Patrol',
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
    author: 'Sky Patrol',
    readingTime: '10分钟'
  },
  {
    slug: 'react-performance-optimization',
    title: 'React性能优化实战指南：从理论到实践',
    date: '2024-01-18',
    excerpt: '深入探讨React应用的性能优化策略，包括组件优化、状态管理、代码分割等实用技巧。',
    content: '随着React应用规模的增长，性能问题逐渐成为用户体验的关键因素。通过组件优化、状态管理优化和代码分割等技术，可以显著提升应用性能。',
    category: '前端开发',
    tags: ['React', '性能优化', '组件优化', '状态管理', '代码分割'],
    author: 'Sky Patrol',
    readingTime: '12分钟'
  },
  {
    slug: 'web-security-best-practices',
    title: 'Web安全防护指南：从XSS到CSRF的全面防御',
    date: '2024-01-15',
    excerpt: '系统介绍Web应用面临的安全威胁及相应的防护措施，帮助开发者构建更安全的应用。',
    content: 'Web应用面临多种安全威胁，包括XSS、CSRF、SQL注入等。通过输入验证、输出编码、使用安全令牌等措施，可以有效防护这些攻击。',
    category: '前端开发',
    tags: ['Web安全', 'XSS', 'CSRF', 'SQL注入', '安全防护'],
    author: 'Sky Patrol',
    readingTime: '15分钟'
  },
  {
    slug: 'nodejs-backend-development',
    title: 'Node.js后端开发实践：从API设计到数据库优化',
    date: '2024-01-12',
    excerpt: '分享Node.js后端开发的实战经验，包括RESTful API设计、数据库优化、错误处理等核心内容。',
    content: 'Node.js后端开发需要关注API设计、数据库优化、错误处理等多个方面。通过合理的设计和优化，可以构建高性能、可维护的后端应用。',
    category: '后端开发',
    tags: ['Node.js', '后端开发', 'API设计', '数据库优化', '错误处理'],
    author: 'Sky Patrol',
    readingTime: '11分钟'
  },
  {
    slug: 'python-data-analysis',
    title: 'Python数据分析实战：从数据清洗到可视化',
    date: '2024-01-10',
    excerpt: '使用Python进行数据分析的完整流程，包括数据获取、清洗、分析和可视化等关键步骤。',
    content: 'Python数据分析包括数据获取、清洗、分析和可视化等步骤。通过pandas、numpy、matplotlib等工具，可以高效地完成数据分析任务。',
    category: '数据科学',
    tags: ['Python', '数据分析', 'pandas', '可视化', '数据清洗'],
    author: 'Sky Patrol',
    readingTime: '9分钟'
  }
]

// 初始状态
const initialState = {
  posts: blogPosts,
  filteredPosts: blogPosts,
  categories: ['前端开发', '后端开发', '数据科学'],
  tags: ['响应式设计', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', '数据分析'],
  selectedCategory: '',
  selectedTags: [],
  searchQuery: '',
  viewMode: 'grid',
  loading: false,
  currentPost: null,
  relatedPosts: []
}

// 创建 store
export const useBlogStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // 初始化文章数据
      initializePosts: async () => {
        set({ loading: true })
        await new Promise(resolve => setTimeout(resolve, 1000))
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
      getPostBySlug: (slug) => {
        const post = get().posts.find(p => p.slug === slug)
        if (post) {
          const relatedPosts = get().posts
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