
export class Config {
    SERVER_URL = 'http://localhost:8080';
    URL = this.SERVER_URL + '/api/v1';
    USER_LOGIN_API = this.URL + '/user/login';
    FETCH_USERS = this.URL + '/fetchUsers';
    CREATE_CHAT = this.URL + '/create/chat';
    FETCH_CHATS = this.URL + '/get/chats'
}
