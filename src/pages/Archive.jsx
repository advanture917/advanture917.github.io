import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBlogStore } from '../store/blogStore'
import { 
  Calendar, 
  Clock, 
  Tag, 
  User, 
  Filter, 
  Search,
  Grid,
  List
} from 'lucide-react'
import ArticleCard from '../components/ArticleCard'

const Archive = () => {
  const { 
    filteredPosts, 
    searchQuery, 
    selectedCategory, 
    selectedTag,
    searchPosts, 
    filterByCategory, 
    filterByTag,
    getCategories, 
    getTags,
    initializePosts,
    loading,
    posts
  } = useBlogStore()

  useEffect(() => {
    initializePosts()
  }, [])

  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const [showFilters, setShowFilters] = useState(false)

  const categories = getCategories()
  const tags = getTags()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchPosts(localSearchQuery)
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [localSearchQuery])

  // Group posts by year
  const postsByYear = filteredPosts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(post)
    return acc
  }, {})

  const sortedYears = Object.keys(postsByYear).sort((a, b) => b - a)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              文章归档
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              探索编程技术、金融理财和生活感悟的深度文章，记录我的学习、思考和成长过程
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {filteredPosts.length}
                </div>
                <div className="text-gray-500 dark:text-gray-400">篇文章</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {categories.length - 1}
                </div>
                <div className="text-gray-500 dark:text-gray-400">个分类</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {tags.length - 1}
                </div>
                <div className="text-gray-500 dark:text-gray-400">个标签</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜索文章..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Filter size={18} />
                <span>筛选</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    按分类筛选
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => filterByCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'all' ? '所有分类' : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tag Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    按标签筛选
                  </label>
                  <select
                    value={selectedTag}
                    onChange={(e) => filterByTag(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {tags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag === 'all' ? '所有标签' : tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Summary */}
          <div className="mb-8">
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">正在加载文章...</p>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                找到 {filteredPosts.length} 篇文章
                {searchQuery && (
                  <span>，搜索关键词: "<span className="font-medium text-primary-600 dark:text-primary-400">{searchQuery}</span>"</span>
                )}
                {selectedCategory !== 'all' && (
                  <span>，分类: <span className="font-medium text-primary-600 dark:text-primary-400">{selectedCategory}</span></span>
                )}
                {selectedTag !== 'all' && (
                  <span>，标签: <span className="font-medium text-primary-600 dark:text-primary-400">{selectedTag}</span></span>
                )}
              </p>
            )}
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ArticleCard post={post} index={index} />
                </motion.div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{post.readingTime}</span>
                        </div>
                        <div className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded text-xs font-medium">
                          {post.category}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
                        <Link to={`/post/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Link
                              key={tagIndex}
                              to={`/search?tag=${encodeURIComponent(tag)}`}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                            >
                              <Tag size={10} className="mr-1" />
                              {tag}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <Link
                        to={`/post/${post.slug}`}
                        className="btn btn-primary text-sm"
                      >
                        阅读
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                <Search size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">没有找到匹配的文章</p>
                <p className="text-sm mt-2">尝试调整搜索条件或筛选器</p>
              </div>
              <button
                onClick={() => {
                  setLocalSearchQuery('')
                  filterByCategory('all')
                  filterByTag('all')
                }}
                className="btn btn-primary"
              >
                清除所有筛选
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Timeline View (Optional) */}
      {viewMode === 'list' && filteredPosts.length > 0 && (
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              发布时间线
            </h2>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800"></div>
              
              {sortedYears.map((year) => (
                <div key={year} className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                      {year}
                    </div>
                    <div className="ml-6 text-lg font-semibold text-gray-900 dark:text-white">
                      {year}年发布了 {postsByYear[year].length} 篇文章
                    </div>
                  </div>
                  
                  <div className="ml-16 space-y-4">
                    {postsByYear[year].map((post) => (
                      <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
                      >
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/post/${post.slug}`}
                            className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 line-clamp-1"
                          >
                            {post.title}
                          </Link>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                            <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
                            <span>{post.readingTime}</span>
                            <span>{post.category}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Archive