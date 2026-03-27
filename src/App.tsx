import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Training } from './pages/Training/Training'
import './style.css'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Footer } from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/training" element={<Training />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
