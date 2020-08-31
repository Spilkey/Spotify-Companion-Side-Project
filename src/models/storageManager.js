class Storage {

    getAccessToken(){
        return localStorage.getItem('token') || null;
    }

    getRefreshToken(){
        return localStorage.getItem('refresh') || null;
    }

    setAccessToken(token){
        localStorage.setItem('token', token);
    }

    setRefreshToken(token){
        localStorage.setItem('refresh', token);
    }

    clearStorage(){
        localStorage.clear();
    }
}
export default Storage;