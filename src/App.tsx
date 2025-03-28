import './App.css'
import { AuthProvider } from './components/context/authcontext';
import { Navigation } from './components/Navigation/Navigation';

function App() {

  /*const AUTH_URL = 'http://192.168.0.115:8000/security'
  const AUTH_LOGIN_PATH = '/v2/oauth/login'
  const REFRESH_TOKEN_PATH = '/v2/oauth/token/refresh'
  const CLIENT_ID_AUTH_SERVER = 'sasfdesarrollo'
  const CLIENT_SECRET_AUTH_SERVER = 'S@sfD3sarr0ll0'*/

  //<button className='bg-black rounded-lg text-white p-2' onClick={login}>Login</button>

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  )
}

export default App
