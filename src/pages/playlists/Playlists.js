import React, { Component } from 'react';

import '../../components/spinner.css';

import './playlists.css'

import Playlist from '../../models/Playlist'
import Storage from '../../models/Storage'
import Tokens from '../../models/Tokens'

import ArtistCard from '../../components/playlistCard/PlayListCard'
import SongItem from '../../components/playlistCard/SongItem'

class Playlists extends Component {
    constructor(props) {
        super(props);
        this.state = {playListData: null, drilledDown: false, trackData: null, selectStateLookUp: null, numberSelcted: 0};
        this._isMounted = false;
        this.playListModel = new Playlist();
        this.storage = new Storage();
        this.tokens = new Tokens();

        this.logout = this.props.logout;

        this.selectedTracks = [];
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

    playListClick(playListId) {
        this.setState({ drilledDown: true })
        this.playListModel.getPlayList(playListId)
            .then(data => {
                if (data.data.error) {
                    if (data.data.error.status == 401) {
                        this.tokens.refreshToken(this.storage.getRefreshToken())
                        .then(data => {
                            if(data.access_token){
                                this.tokens.setAccessToken(data.access_token);
                                this.playListClick(playListId);
                            }
                        });
                    }
                }else{
                    let trackLkp = this.populateSelectStates(data.data);
                    this.setState({ trackData: data, selectStateLookUp: trackLkp });
                }
            });
    }

    makePlayListCards(response) {
        let cards = [];
        let playlists = response.data;
        playlists.forEach(element => {
            let card = (
                <ArtistCard cardData={element} onClick={() => this.playListClick(element.playListId)}/>
            );
            cards.push(card);
        });
        return cards;
    }


    songRowClick(element, trackId, artists){
        let trackSelectLkp = this.state.selectStateLookUp;
        let selected = !this.state.selectStateLookUp[trackId];
        trackSelectLkp[trackId] = selected;
        
        if(selected){
            this.selectedTracks.push(trackId);
        }else{
            this.selectedTracks.splice(this.selectedTracks.indexOf(trackId), 1);
        }     
        this.setState({selectStateLookUp: trackSelectLkp, numberSelcted: this.selectedTracks.length});
    }

    populateSelectStates(tracks){
        let trackLkp = {};
        tracks.forEach(element => {
            trackLkp[element.id] = false;
        });
        return trackLkp;
    }

    makeSongCards(response) {
        let rows = [];
        let trackData = response.data;
        let metaData = response.metaData;
        
        let topRow = (             
        <div className="song-row-top song-row" >
            <div className="song-checkbox-parent">Select</div>
            <div>Liked</div>
            <div className="song-title">Title</div>
            <div className="song-artists">Artists</div>
            <div>Added at</div>
        </div>);

        rows.push(topRow);
        if(this.state.selectStateLookUp){
            (trackData).forEach(element => {
                let row = (<SongItem className="song-row" songData={element} isSelected={this.state.selectStateLookUp[element.id]} onClick={(e)=>{this.songRowClick(e, element.id, element.artists)}}/>)
                rows.push(row);
            });
            return rows;
        }
        return [];


    }

    returnToPlayLists(){
        this.setState({trackData: null, drilledDown: false, selectStateLookUp: null});
    }
    
    render() {
        let response = this.state.playListData;
        let trackData = this.state.trackData;
        let drilledDown = this.state.drilledDown;
        let loader = <div className="loader"></div>;
        let parentClass = drilledDown ? "track-grid" : "play-list-grid"
        let content;
        let backButton;
        if (response) {
            if (!drilledDown) {
                console.log(response);
                let cards = this.makePlayListCards(response);
                content = cards.map((value) =>
                    <div>{value}</div>
                )
            } else {
                if (trackData) {
                    let cards = this.makeSongCards(trackData);
                    content = cards.map((value) =>
                        <div className="track-grid-item">{value}</div>
                    )
                    backButton = <button onClick={()=> this.returnToPlayLists()}>Back</button>;
                } else {
                    content = loader;
                }
            }
        } else {
            content = loader;
        }

        return (

            <div className={parentClass}>
                {backButton}
                {content}
            </div>
        )

    }
}

export default Playlists;