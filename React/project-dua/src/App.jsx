import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomeView from './views/HomeView'
import AboutView from './views/AboutView'
import ContactView from './views/ContactView'
import { useDocumentTitle } from './hooks/useDocumentTitle'

const pageTitles = {
  home: null,
  about: 'About',
  contact: 'Contact',
}

function App() {
  const [activePage, setActivePage] = useState('home')

  useDocumentTitle(pageTitles[activePage])

  function renderView() {
    switch (activePage) {
      case 'about':
        return <AboutView />
      case 'contact':
        return <ContactView />
      default:
        return <HomeView onNavigate={setActivePage} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1">{renderView()}</main>
      <Footer />
    </div>
  )
}

export default App
