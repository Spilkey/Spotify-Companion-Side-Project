import Storage from './Storage';

class Playlist {
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

    async getPlayList(playListId){
        let access_token = (new Storage()).getAccessToken();
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/playlist/get-playlist?playlist_id=${playListId}&access_token=${access_token}`, this.requestParams);
        let data = await response.json();
        return data;
    }

    async getPlayLists() {
        let access_token = (new Storage()).getAccessToken();
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/playlist/get-playlists?access_token=${access_token}`, this.requestParams);
        let data = await response.json();
        return data;
    }

    async likeTracks(trackIds) {
        let access_token = (new Storage()).getAccessToken();
        let newParams = this.requestParams;
        newParams.method = "POST";
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/tracks/like-tracks?access_token=${access_token}&trackIds[]=${trackIds}`, newParams);
        let data = await response.json();
        return data;
    }

    async unlikeTracks(trackIds) {
        let access_token = (new Storage()).getAccessToken();
        let newParams = this.requestParams;
        newParams.method = "POST";
        
        console.log(newParams);
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/tracks/unlike-tracks?access_token=${access_token}&trackIds[]=${trackIds.join(',')}`, newParams);
        let data = await response.json();
        return data;
    }
    
}

export default Playlist;