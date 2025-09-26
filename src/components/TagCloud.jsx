import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Hash } from 'lucide-react'

const TagCloud = ({ tags }) => {
  const navigate = useNavigate()

  const getTagSize = (index) => {
    const sizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl']
    return sizes[index % sizes.length]
  }

  const getTagColor = (index) => {
    const colors = [
      'bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800',
      'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800',
      'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800',
      'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800',
      'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800',
      'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800'
    ]
    return colors[index % colors.length]
  }

  const handleTagClick = (tag) => {
    navigate(`/search?tag=${encodeURIComponent(tag)}`)
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {tags.map((tag, index) => (
        <motion.button
          key={tag}
          onClick={() => handleTagClick(tag)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            inline-flex items-center px-4 py-2 rounded-full font-medium transition-all duration-200
            ${getTagSize(index)} ${getTagColor(index)}
            hover:shadow-lg transform hover:-translate-y-1
          `}
        >
          <Hash size={16} className="mr-2" />
          {tag}
        </motion.button>
      ))}
    </div>
  )
}

export default TagCloud