import React, { Component } from 'react';

import './components.css'


import Playlist from '../../models/Playlist'
import Storage from '../../models/Storage'
import Tokens from '../../models/Tokens'
import Search from '../../models/Search'

class AnalyzePlaylist extends Component {
    constructor(props){
        super(props);
        this.state = {playListData: null, searchData: null}

        this.tokens = new Tokens();
        this.storage = new Storage();
        this.playListModel = new Playlist();
        this.search = new Search();

        this.logout = this.props.logout;
    }

    getPlayLists() {
        this.playListModel.getPlayLists()
            .then(data => {
                if (data.data.error) {
                    if (data.data.error.status == 401) {
                        this.tokens.refreshToken(this.storage.getRefreshToken())
                        .then(data => {
                            if(data.access_token){
                                this.storage.setAccessToken(data.access_token);
                                this.getPlayLists();
                            }else{
                                this.logout();
                            }
                        }); 
                    }
                }else{
                    this.setState({ playListData: data });
                }
            });
    }

    componentDidMount() {
        this._isMounted = true;
        this.getPlayLists();
    }

    createPlayLists(data){
        let playlists = data.data;

        return playlists.map((value) => 
            <div className="my-playlist-row">
                <div>{value.playListName} by {value.playListOwner}</div>
            </div>
        );
    }

    createPlayListsSearch(data){
        let playlists = data;

        return playlists.map((value) => 
            <div className="my-playlist-row">
                <div>{value.name || ""} by {value.owner.display_name}</div>
            </div>
        );
    }

    onYup(e){
        console.log(e)
        let value = e.target.value;
        this.search.searchPlaylists(value)
        .then(data => {
            console.log(data);
            if (data.results.error) {
                if (data.results.error.status == 401) {
                    this.tokens.refreshToken(this.storage.getRefreshToken())
                    .then(data => {
                        if(data.access_token){
                            this.storage.setAccessToken(data.access_token);
                            this.onYup(e);
                        }else{
                            this.logout();
                        }
                    }); 
                }
            }else{
                this.setState({ searchData: data.results.playlists.items });
            }
        });
    }

    render(){
        let playListData = this.state.playListData;
        let searchData = this.state.searchData;
        let playlists;
        let playListSearch;

        if(playListData){
            playlists = this.createPlayLists(playListData);
        }
        if(searchData){
            playListSearch = this.createPlayListsSearch(searchData);
        }
        return (
        <div className="analyze-bottom-grid">
            <h2 className="spacer">Select one of your playlists</h2>
            {playlists}
            <h2 className="spacer"> OR</h2>
            <h2 className="spacer">Search a playlist</h2>
            <div className="search">
                <i className="fa fa-search"></i>
                <input onKeyUp={e => this.onYup(e)} placeholder="Search Playlists"></input>
            </div>
            {playListSearch}
        </div>
        )
    }
}

export default AnalyzePlaylist;