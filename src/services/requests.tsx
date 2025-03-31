import axios from "axios";

export async function refreshToken(token: string) {
    const data = await axios.get("http://192.168.0.115:8000/security/v2/oauth/token/refresh", {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    })
    localStorage.setItem("token", data.data.access_token);
    console.log(data.data);
}

export async function loginreq(username: string, password: string): Promise<boolean> {
    try {
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
        localStorage.setItem("token", data.data.access_token);
        console.log(data.data)
        console.log("acceso");
        return (true);
    } catch (error) {
        console.log(error)
        return (false);
    }
}

export function logintest(username: string, password: string): boolean {
    if (username === "admin" && password === "admin") {
        localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW9fZGVfcHJ1ZWJhcyIsImV4cCI6MTc0MzM5MTc4OSwiaWF0IjoxNzQzMzkxNzI5fQ.8H9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D");
        return true;
    }
    return false;
}