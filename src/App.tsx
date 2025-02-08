import { Routes, Route, BrowserRouter } from 'react-router-dom'
import MainP from './infrastructure/ui/components/main/main-p'
import UserPosts from './infrastructure/ui/components/main/Posts/user-posts'
import LoginComponent from './infrastructure/ui/components/auth/login'
import ProtectedRoutes from './shared/components/ProtectedRoutes'
import { Navigate } from 'react-router-dom'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

    
        <Route path="/feed" element={
          <ProtectedRoutes>
            <MainP />
          </ProtectedRoutes>
          }>

          <Route path="" element={<UserPosts /> } />
            
        </Route>


        <Route path='/login' element={<LoginComponent />}/>
        <Route path='/' element={<Navigate to={"/feed"}/>}/>
      </Routes>
    </BrowserRouter>
  )
}
