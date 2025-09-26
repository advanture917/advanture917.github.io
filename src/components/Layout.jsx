import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main className="min-h-screen">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  )
}

export default Layout