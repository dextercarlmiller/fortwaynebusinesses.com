import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import BrowsePage from './pages/BrowsePage'
import CategoryPage from './pages/CategoryPage'
import BusinessProfilePage from './pages/BusinessProfilePage'
import AddBusinessPage from './pages/AddBusinessPage'
import ClaimListingPage from './pages/ClaimListingPage'
import WebStudioPage from './pages/WebStudioPage'
import AdminPage from './pages/AdminPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col bg-cream">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/business/:slug" element={<BusinessProfilePage />} />
              <Route path="/add-business" element={<AddBusinessPage />} />
              <Route path="/claim" element={<ClaimListingPage />} />
              <Route path="/claim/:businessId" element={<ClaimListingPage />} />
              <Route path="/web-studio" element={<WebStudioPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
