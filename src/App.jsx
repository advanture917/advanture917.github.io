import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useThemeStore } from './store/themeStore'
import Layout from './components/Layout'
import Home from './pages/Home'
import BlogPost from './pages/BlogPost'
import Archive from './pages/Archive'
import About from './pages/About'
import SearchPage from './pages/Search'
import NotFound from './pages/NotFound'

function App() {
  const { theme, initializeTheme } = useThemeStore()
  const location = useLocation()

  useEffect(() => {
    initializeTheme()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // 路由变化时滚动到页面顶部
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<BlogPost />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App