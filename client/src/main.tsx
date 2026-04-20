import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import './css/index.css'
import App from './App.tsx'
import AdminLogin from './pages/admin/Login.tsx'
import AdminDashboard from './pages/admin/Dashboard.tsx'
import { ProtectedRoute } from './components/admin/ProtectedRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/brynasbilservice">
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
