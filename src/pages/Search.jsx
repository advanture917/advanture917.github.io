import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBlogStore } from '../store/blogStore'
import ArticleCard from '../components/ArticleCard'
import { 
  Search, 
  Filter, 
  Tag, 
  Calendar, 
  Clock, 
  User,
  X,
  TrendingUp,
  Hash,
  ChevronRight
} from 'lucide-react'

const SearchPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
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
    getPopularTags
  } = useBlogStore()

  const [localSearchQuery, setLocalSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('date') // date, title, category
  const [sortOrder, setSortOrder] = useState('desc') // asc, desc

  const categories = getCategories()
  const tags = getTags()
  const popularTags = getPopularTags()

  // Parse URL parameters on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const query = params.get('q') || ''
    const category = params.get('category') || 'all'
    const tag = params.get('tag') || 'all'

    setLocalSearchQuery(query)
    if (category !== 'all') filterByCategory(category)
    if (tag !== 'all') filterByTag(tag)
  }, [location.search])

  // Update URL when search/filters change
  useEffect(() => {
    const params = new URLSearchParams()
    
    if (localSearchQuery) params.set('q', localSearchQuery)
    if (selectedCategory !== 'all') params.set('category', selectedCategory)
    if (selectedTag !== 'all') params.set('tag', selectedTag)
    
    const newUrl = `/search${params.toString() ? '?' + params.toString() : ''}`
    navigate(newUrl, { replace: true })
  }, [localSearchQuery, selectedCategory, selectedTag, navigate])

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchPosts(localSearchQuery)
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [localSearchQuery])

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy) {
      case 'title':
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
        break
      case 'category':
        aValue = a.category.toLowerCase()
        bValue = b.category.toLowerCase()
        break
      case 'date':
      default:
        aValue = new Date(a.date)
        bValue = new Date(b.date)
        break
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const clearAllFilters = () => {
    setLocalSearchQuery('')
    filterByCategory('all')
    filterByTag('all')
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedTag !== 'all'

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
              搜索文章
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              通过关键词、分类或标签快速找到你感兴趣的技术文章
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Main Search */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="输入关键词搜索文章..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
              />
              {localSearchQuery && (
                <button
                  onClick={() => setLocalSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Controls */}
              <div className="flex items-center space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="date">按日期</option>
                  <option value="title">按标题</option>
                  <option value="category">按分类</option>
                </select>
                
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
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

          {/* Active Filters */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 flex flex-wrap items-center gap-2"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">当前筛选:</span>
              
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                  搜索: {searchQuery}
                  <button
                    onClick={() => setLocalSearchQuery('')}
                    className="ml-2 hover:text-primary-900 dark:hover:text-primary-100"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                  分类: {selectedCategory}
                  <button
                    onClick={() => filterByCategory('all')}
                    className="ml-2 hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              
              {selectedTag !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                  标签: {selectedTag}
                  <button
                    onClick={() => filterByTag('all')}
                    className="ml-2 hover:text-green-900 dark:hover:text-green-100"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline"
              >
                清除所有筛选
              </button>
            </motion.div>
          )}

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                {/* Popular Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    热门标签
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.slice(0, 8).map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => filterByTag(tag)}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs transition-colors duration-200 ${
                          selectedTag === tag
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300'
                        }`}
                      >
                        <Hash size={10} className="mr-1" />
                        {tag}
                      </button>
                    ))}
                  </div>
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
            <p className="text-gray-600 dark:text-gray-400">
              找到 {sortedPosts.length} 篇文章
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
          </div>

          {/* Results Grid */}
          {sortedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPosts.map((post, index) => (
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
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 mb-6">
                <Search size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">没有找到匹配的文章</p>
                <p className="text-sm">尝试调整搜索条件或筛选器</p>
              </div>
              
              {/* Suggestions */}
              <div className="max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  热门标签推荐
                </h3>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {popularTags.slice(0, 10).map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => filterByTag(tag)}
                      className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                    >
                      <Hash size={12} className="mr-1" />
                      {tag}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={clearAllFilters}
                  className="btn btn-primary"
                >
                  清除所有筛选
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Popular Searches */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 mr-2 text-primary-600" />
              热门搜索
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              发现最受欢迎的技术话题
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['JavaScript', 'React', 'Vue', 'CSS', 'Node.js', 'TypeScript', 'Python', 'Git', 'Docker', 'MongoDB', 'Webpack', 'ES6'].map((term, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLocalSearchQuery(term)}
                className="group relative p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-200 text-center"
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  {term}
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SearchPage