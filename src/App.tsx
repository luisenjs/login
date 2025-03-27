import { useState } from 'react';
import './App.css'
import { Dashboard } from './components/pages/dashboard/dashboard';
import { Login } from './components/pages/login/login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

function App() {

  //const { isAuth, setIsAuth } = useContext(authContext)

  /*const AUTH_URL = 'http://192.168.0.115:8000/security'
  const AUTH_LOGIN_PATH = '/v2/oauth/login'
  const REFRESH_TOKEN_PATH = '/v2/oauth/token/refresh'
  const CLIENT_ID_AUTH_SERVER = 'sasfdesarrollo'
  const CLIENT_SECRET_AUTH_SERVER = 'S@sfD3sarr0ll0'*/

  //<button className='bg-black rounded-lg text-white p-2' onClick={login}>Login</button>

  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/login' element={<Login setIsAuth={setIsAuth} />}>
        </Route>
        <Route path='/dashboard' element={isAuth ? <Dashboard /> : <Navigate to="/auth/login" />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
