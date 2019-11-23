import {authService} from "./auth.service";

const baseApi = '/task';

function addComment(taskId, content) {
    return authService.securedPost(baseApi + '/' + taskId + "/add-comment",content);
}

function getAll() {
    return authService.securedGet(baseApi + '/all');
}

function get(id) {
    return authService.securedGet(baseApi + '/' + id);
}

function save(task) {
    return authService.securedPost(baseApi + '/add',task);
}

function update(task) {
    return authService.securedPut(baseApi + '/update',task);
}

function getStatuses() {
    return authService.securedGet(baseApi + '/statuses');
}

export const taskService = {
    getAll,
    getStatuses,
    get,
    addComment,
    save,
    update,
};
