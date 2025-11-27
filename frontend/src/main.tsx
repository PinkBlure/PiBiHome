import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import { App } from './App.tsx'
import { Home } from './pages/Home'
import { Categories } from './pages/Categories'
import { Balance } from './pages/Balance'
import { MonthlyCategorySummary } from './pages/MonthlyCategorySummary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="balance" element={<Balance />} />
          <Route path="summary" element={<MonthlyCategorySummary />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
)