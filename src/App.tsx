import './App.css'
import { Dashboard } from './components/pages/dashboard/dashboard';
import { Login } from './components/pages/login/login';
import { BrowserRouter, Route, Routes } from 'react-router';

function App() {

  /*const AUTH_URL = 'http://192.168.0.115:8000/security'
  const AUTH_LOGIN_PATH = '/v2/oauth/login'
  const REFRESH_TOKEN_PATH = '/v2/oauth/token/refresh'
  const CLIENT_ID_AUTH_SERVER = 'sasfdesarrollo'
  const CLIENT_SECRET_AUTH_SERVER = 'S@sfD3sarr0ll0'*/

  //<button className='bg-black rounded-lg text-white p-2' onClick={login}>Login</button>

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}>
        </Route>
        <Route path='/dashboard' element={<Dashboard />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
