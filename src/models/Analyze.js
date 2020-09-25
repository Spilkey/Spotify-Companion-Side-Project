import Storage from './Storage';
import Params from './Params';

class Analyze {
    constructor(){
        this.requestParams = Params.getParams();
    }

    async getPlayListAnalysis(playlist_id){
        let access_token = (new Storage()).getAccessToken();
        const response = await fetch(`http://localhost:8888/analysis/analyze-playlist?playlist_id=${playlist_id}&access_token=${access_token}`, this.requestParams);
        let data = await response.json();
        return data;
    }
}

export default Analyze;