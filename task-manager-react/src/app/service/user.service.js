import {authService} from "./auth.service";

const baseApi = '/user';

function changePassword(body) {
    return authService.securedPut(baseApi + '/password/update' , body);
}

function getAll() {
    return authService.securedGet(baseApi + '/all');
}

function lockOne(email) {
    return authService.securedPut(baseApi + '/' + email + '/lock');
}

function unlockOne(email) {
    return authService.securedPut(baseApi + '/' + email + '/unlock');
}

function resetOne(email) {
    return authService.securedPut(baseApi + '/' + email + '/reset');
}

function saveOne(user) {
    return authService.securedPost(baseApi + '/add',user);
}

export const userService = {
    getAll,
    lockOne,
    unlockOne,
    resetOne,
    saveOne,
    changePassword
};
