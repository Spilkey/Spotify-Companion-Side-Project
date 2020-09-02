import Storage from './Storage'
class Followed {
    constructor(after){
        this.requestParams = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }
        // populate after query if we have it
        this.after =  after ? `&after=${after}` : '';
        this.access_token = 'access_token=' + (new Storage()).getAccessToken();
    }

    async getFollowedArtists(){
        let query = `?${this.access_token}${this.after}`
        const response = await fetch(`http://localhost:8888/follow/following${query}`, this.requestParams);
        let data = await response.json();
        return data;
    }
}

export default Followed;