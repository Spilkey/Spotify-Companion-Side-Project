class Tokens {
    constructor(){
        this.requestParams = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }
    }

    async getToken(code){
        const response = await fetch("http://localhost:8888/auth/swap?code=" + code, this.requestParams);
        let credentials = await response.json();
        return credentials;
    }

    async refreshToken(refresh) {
        const response = await fetch("http://localhost:8888/auth/refresh_token?refresh_token=" + refresh, this.requestParams);
        let credentialsNew = await response.json();
        return credentialsNew;
    }
}

export default Tokens;