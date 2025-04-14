// services
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import HandleLoading from './shared/components/Loaders/HandleLoading'


// Components
const MainP = lazy(() => import('./infrastructure/ui/main/main-p'))
const LoginComponent =  lazy(() => import('./infrastructure/ui/auth/login'))
const UserPosts = lazy(() => import('./infrastructure/ui/main/Posts/user-posts'))
const ProtectedRoutes = lazy(() => import('./shared/components/ProtectedRoutes'))
const Profile = lazy(() => import('./infrastructure/ui/profile/profile')) 
const StatusPost = lazy(() => import('./infrastructure/ui/main/Posts/components/StatusPost/StatusPost'))
const Portfolio = lazy(() => import ('./infrastructure/ui/portfolios/portfolio'))
const NotificationPop = lazy(() => import ('./shared/components/Notifications/NotificationPop')) 

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={HandleLoading()}>
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
        </Suspense>
        
      <Suspense fallback={HandleLoading()}>
        <NotificationPop />
      </Suspense>
    </BrowserRouter>
  )
}
