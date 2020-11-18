import Storage from './Storage'
import Tokens from './Tokens'

class ReAuth {
    constructor(){
        this.storage = new Storage();
        this.tokens = new Tokens();
    }

    reAuth(callback, logout){

        this.tokens.refreshToken(this.storage.getRefreshToken())
        .then(data => {
            if(data.access_token){
                this.storage.setAccessToken(data.access_token);
                callback();
            }else{
                logout();
            }
        }); 
    }
}
export default ReAuth;