import { useState } from 'react'
import { About } from './components/About'
import { DogVisionFilter } from './components/DogVisionFilter'
import { NavBar, type PageName } from './components/NavBar'
import { Simulator } from './components/Simulator'

function App() {
  const [page, setPage] = useState<PageName>('simulator')

  return (
    <div className="app">
      <DogVisionFilter />
      <NavBar currentPage={page} onNavigate={setPage} />
      <main className="main-content">
        {page === 'simulator' ? <Simulator /> : <About />}
      </main>
    </div>
  )
}

export default App
