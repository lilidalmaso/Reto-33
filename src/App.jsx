import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import StarsCanvas from './components/StarsCanvas'
import BubblesCanvas from './components/BubblesCanvas'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="app">
      <StarsCanvas />
      <BubblesCanvas />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default App
