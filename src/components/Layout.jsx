import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import ScrollToTop from './ScrollToTop'

const Layout = () => (
  <>
    <a className="skip-link" href="#main-content">
      Skip to content
    </a>
    <Header />
    <ScrollToTop />
    <main id="main-content">
      <Outlet />
    </main>
    <Footer />
  </>
)

export default Layout
