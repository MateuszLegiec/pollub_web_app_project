const jwtDecode = require('jwt-decode');
const baseApi = 'http://localhost:5000/api';

function getCurrentUser() {
    return {
        email: sessionStorage.getItem('email'),
        firstName: sessionStorage.getItem('firstName'),
        lastName: sessionStorage.getItem('lastName'),
        admin: (sessionStorage.getItem('admin') === 'true'),
        firstLogin: (sessionStorage.getItem('firstLogin') === 'true')
    };
}

function login(email, password){
    const credentials = {
        email: email,
        password: password
    };
    fetch(baseApi + '/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
        })
        .then(handleResponse)
        .then(body => {

            const token = body.token;
            sessionStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            sessionStorage.setItem('email',decoded.email);
            sessionStorage.setItem('firstName',decoded.firstName);
            sessionStorage.setItem('lastName',decoded.lastName);
            sessionStorage.setItem('admin',decoded.isAdmin);
            sessionStorage.setItem('firstLogin',!decoded.havePasswordUpdated);
            sessionStorage.setItem('exp',decoded.exp);

            if (decoded.isLocked === true){
                alert("Account is locked");
                logout();
            }else {
                window.location.reload();
            }
        })
        .catch(err => {
            console.log(err);
            alert('Bad credentials');
        });
}

function isTokenExpired(){
    return sessionStorage.getItem('exp') < new Date().getTime().toString().substring(0,10);
}

function logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
    sessionStorage.removeItem('admin');
    sessionStorage.removeItem('firstLogin');
    sessionStorage.removeItem('exp');
    window.location.reload();
}

function handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if ([401, 403].indexOf(response.status) !== -1) {
                    authService.logout();
                    window.location.reload();
                }
                return Promise.reject((data && data.message) || response.statusText);
            }
            return data;
        });
}

function authHeader() {
    return sessionStorage.getItem('token');
}

function isAuthenticated() {
   return sessionStorage.getItem('token') !== null;
}

function securedGet(url) {
    if (this.isAuthenticated() && !this.isTokenExpired()) {
        return fetch(baseApi + url, {
            method: 'GET',
            headers: {
                'Authorization': authHeader(),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(response => response.json());
    } else {
        alert('Token expired, please login again');
        logout();
    }
}

function securedPost(url,body) {
    if (this.isAuthenticated() && !this.isTokenExpired()) {
        return fetch(baseApi + url, {
            method: 'POST',
            headers: {
                'Authorization': authHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json());
    } else {
        alert('Token expired, please login again');
        logout();
    }
}

function securedPut(url,body) {
    if (this.isAuthenticated() && !this.isTokenExpired()) {
        return fetch(baseApi + url, {
            method: 'PUT',
            headers: {
                'Authorization': authHeader(),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json());
    } else {
        alert('Token expired, please login again');
        logout();
    }
}

export const authService = {
    login,
    logout,
    getCurrentUser,
    isAuthenticated,
    isTokenExpired,
    securedGet,
    securedPost,
    securedPut
};
