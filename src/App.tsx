import './App.css'
import AppRoutes from './router/AppRoutes'
import { UserProvider } from './context/UserContext.tsx'

function App() {

  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  )
}

export default App
