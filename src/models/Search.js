import Storage from './Storage';

class Search {
    constructor(){
        this.requestParams = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }
        ;
    }

    async searchPlaylists(value){
        console.log(value);
        let access_token = (new Storage()).getAccessToken();
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/search/search-playlists?params=${value}&access_token=${access_token}`, this.requestParams);
        let data = await response.json();
        return data;
    }

    async searchSongs(value){
        let access_token = (new Storage()).getAccessToken();
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/search/search-songs?params=${value}&access_token=${access_token}`, this.requestParams);
        let data = await response.json();
        return data;
    }
}
export default Search;