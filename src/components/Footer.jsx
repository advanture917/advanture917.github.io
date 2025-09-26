import { Link } from 'react-router-dom'
import { Github, Twitter, Mail, Rss } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/advanture917',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://x.com/adventure_917',
      color: 'hover:text-blue-500'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:2829777585@qq.com',
      color: 'hover:text-red-500'
    },
    {
      name: 'RSS',
      icon: Rss,
      href: '/feed.xml',
      color: 'hover:text-orange-500'
    }
  ]

  const quickLinks = [
    { name: '首页', href: '/' },
    { name: '所有文章', href: '/archive' },
    { name: '标签云', href: '/tags' },
    { name: '关于我', href: '/about' },
    { name: '搜索', href: '/search' }
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                赤心巡天 | Loyal Heart Over the Sky
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              专注于 人工智能应用 与 Web3探索 的个人技术博客。
              记录学习与实践的足迹，一颗赤心，以巡天，分享技术见解与成长感悟。
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-500 dark:text-gray-400 transition-colors duration-200 ${link.color}`}
                    aria-label={link.name}
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              快速导航
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              技术栈
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">前端框架</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">React 18 + Vite</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">样式方案</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">TailwindCSS + Framer Motion</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">部署平台</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">GitHub Pages</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} 技术博客. 保留所有权利.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <Link 
                to="/" 
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                隐私政策
              </Link>
              <Link 
                to="/" 
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                使用条款
              </Link>
              <Link 
                to="/sitemap.xml" 
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                网站地图
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer