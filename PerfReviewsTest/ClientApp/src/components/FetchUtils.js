const LOGIN_URL = '/api/Auth/login';

const TOKEN_KEY = 'auth_token';

async function loginRequest(login) {
    let loginData = new FormData();
    loginData.append('userName', login);

    const loginResp = await request(LOGIN_URL, 'POST', loginData);

    if (loginResp.status === 200) {
        const { token } = await loginResp.json();
        sessionStorage[TOKEN_KEY] = token;
        return true;
    } else {
        return false;
    }
}

async function request(url, method = 'GET', data = null, headers = {}) {
    const userStoredToken = sessionStorage[TOKEN_KEY];

    if (userStoredToken) {
        headers['Authorization'] = `Bearer ${userStoredToken}`;
    }

    return await fetch(url, {
        method: method,
        body: data,
        headers: headers
    });
}

export default { loginRequest, request };