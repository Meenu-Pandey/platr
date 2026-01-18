import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { useToast, ToastContainer } from './components/Toast'
import AppShell from './components/AppShell'

import './App.css'
import './styles/theme.css'
import AppRoutes from './routes/AppRoutes'

function AppContent() {
  const { toast, toasts, removeToast } = useToast();

  // Make toast available globally via window for easier access
  React.useEffect(() => {
    window.toast = toast;
  }, [toast]);

  return (
    <AppShell>
      <AppRoutes />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </AppShell>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App