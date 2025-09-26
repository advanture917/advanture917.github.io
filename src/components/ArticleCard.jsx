import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, User, ArrowRight } from 'lucide-react'

const ArticleCard = ({ post, index = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="card h-full flex flex-col group"
    >
      {/* Article Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{post.readingTime}</span>
          </div>
        </div>
        <div className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded text-xs font-medium">
          {post.category}
        </div>
      </div>

      {/* Article Title */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
        <Link to={`/post/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h3>

      {/* Article Excerpt */}
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
        {post.excerpt}
      </p>

      {/* Article Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              <Tag size={10} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Article Author */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <User size={14} />
          <span>{post.author}</span>
        </div>
        
        <Link
          to={`/post/${post.slug}`}
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm group/link"
        >
          阅读更多
          <ArrowRight 
            size={16} 
            className="ml-1 group-hover/link:translate-x-1 transition-transform duration-200" 
          />
        </Link>
      </div>
    </motion.article>
  )
}

export default ArticleCard