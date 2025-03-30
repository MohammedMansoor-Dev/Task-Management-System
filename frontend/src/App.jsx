import React from 'react'
import Home from './pages/Home'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import AllTasks from './pages/Alltasks'
import ImportantTasks from './pages/ImportantTasks'
import CompleteTasks from './pages/CompleteTasks'
import IncompleteTasks from './pages/IncompleteTasks'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie' // Import js-cookie
import AdminHome from './pages/AdminHome'
import TaskManagement from './pages/TaskManagement'
import UserManagement from './pages/UserManagement'
import ReportIssueForm from './pages/ReportIssueForm'
import Settings from './pages/Settings'

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('token') // Fetch token from cookies
  return token ? children : <Navigate to="/signin" />
}

const AdminRoute = ({ children }) => {
  const token = Cookies.get('token')
  const role = useSelector((state) => state.user.role)

  if (!token) return <Navigate to="/signin" />
  if (role !== 'admin') return <Navigate to="/" />
  
  return children
}

const App = () => {
  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
      <BrowserRouter>
        <Routes>
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}>
            <Route index element={<AllTasks />} />
            <Route path="/importantTasks" element={<ImportantTasks />} />
            <Route path="/completedTasks" element={<CompleteTasks />} />
            <Route path="/incompleteTasks" element={<IncompleteTasks />} />
          </Route>

          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          {/* Admin Route */}
          <Route path="/admin-dashboard" element={<AdminRoute><AdminHome /></AdminRoute>}>
            {/* Set Dashboard as the default route */}
            <Route index element={<Dashboard />} />
            <Route path='task-management' element={<TaskManagement/>} />
            <Route path='user-management' element={<UserManagement/>} />
            <Route path='settings' element={<Settings/>} />
            <Route path='report-issue' element={<ReportIssueForm/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App