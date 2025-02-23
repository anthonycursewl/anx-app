// services
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import UserPosts from './infrastructure/ui/components/main/Posts/user-posts'
import { Navigate } from 'react-router-dom'

// Components
import MainP from './infrastructure/ui/components/main/main-p'
import LoginComponent from './infrastructure/ui/components/auth/login'
import ProtectedRoutes from './shared/components/ProtectedRoutes'
import Profile from './infrastructure/ui/components/profile/profile'
import StatusPost from './infrastructure/ui/components/main/Posts/components/StatusPost/StatusPost'
import Portfolio from './infrastructure/ui/components/portfolios/portfolio'
import NotificationPop from './shared/components/Notifications/NotificationPop'


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
        <Route path='/profile/:username' element={
          <ProtectedRoutes>
            <MainP />
          </ProtectedRoutes>
        }>

          <Route path='' element={<Profile />}/>
        </Route>

        <Route path='/post/status/:id_post' element={ 
          <ProtectedRoutes>
              <MainP />
            </ProtectedRoutes>
        }>

            <Route path='info' element={<StatusPost />}/>
        </Route>

        <Route path='/about/anthony' element={<Portfolio />}/>

        <Route path='*' element={<h1>404</h1>} />
        <Route path='/login' element={<LoginComponent />}/>
        <Route path='/' element={<Navigate to={"/feed"}/>}/>
      </Routes>

      <NotificationPop />
    </BrowserRouter>
  )
}
