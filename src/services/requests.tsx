import axios from "axios";

export async function refreshToken(token: string) {
    const data = await axios.get("http://192.168.0.115:8000/security/v2/oauth/token/refresh", {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    })
    localStorage.setItem("TOKEN", data.data.access_token);
    console.log("cambio");
}

export async function login(username: string, password: string) {
    const param = {
        'username': username,
        'password': password,
        'client_id': 'sasfdesarrollo',
        'client_secret': 'S@sfD3sarr0ll0',
    }
    const data = await axios.post("http://192.168.0.115:8000/security/v2/oauth/login", new URLSearchParams(param), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    localStorage.setItem("TOKEN", data.data.access_token);
    console.log("acceso");
}