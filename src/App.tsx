import { AuthProvider } from './context/authcontext';
import { Navigation } from './Navigation/Navigation';

function App() {

  /*
  AUTH_URL = 'http://192.168.0.115:8000/security'
  AUTH_LOGIN_PATH = '/v2/oauth/login'
  REFRESH_TOKEN_PATH = '/v2/oauth/token/refresh'
  CLIENT_ID_AUTH_SERVER = 'sasfdesarrollo'
  CLIENT_SECRET_AUTH_SERVER = 'S@sfD3sarr0ll0'
  */

  //<button className='bg-black rounded-lg text-white p-2' onClick={login}>Login</button>

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  )
}

export default App
