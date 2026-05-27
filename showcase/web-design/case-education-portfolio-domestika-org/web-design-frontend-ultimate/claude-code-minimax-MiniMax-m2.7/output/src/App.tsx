import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import ProjectsPage from './pages/ProjectsPage'
import PlusPage from './pages/PlusPage'
import LoginPage from './pages/LoginPage'

type Page = 'home' | 'courses' | 'projects' | 'plus' | 'login'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const navigate = (page: Page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-white text-[#171717]">
      {currentPage !== 'login' && (
        <Header currentPage={currentPage} navigate={navigate} />
      )}
      {currentPage === 'home' && <HomePage navigate={navigate} />}
      {currentPage === 'courses' && <CoursesPage navigate={navigate} />}
      {currentPage === 'projects' && <ProjectsPage navigate={navigate} />}
      {currentPage === 'plus' && <PlusPage navigate={navigate} />}
      {currentPage === 'login' && <LoginPage navigate={navigate} />}
      {currentPage !== 'login' && <Footer navigate={navigate} />}
    </div>
  )
}

export default App