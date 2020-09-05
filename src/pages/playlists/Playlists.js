import React, { Component } from 'react';

import '../../components/spinner.css';

import './playlists.css'

import Playlist from '../../models/Playlist'
import Storage from '../../models/Storage'
import Tokens from '../../models/Tokens'

class Playlists extends Component {
    constructor(props) {
        super(props);
        this.state = { playListData: null, drilledDown: false, trackData: null };
        this._isMounted = false;
        this.playListModel = new Playlist();
    }


    getPlayLists() {
        this.playListModel.getPlayLists()
            .then(data => {
                this.setState({ playListData: data });
                if (data.data.error) {
                    if (data.data.error.status == 401) {
                        (new Tokens()).refreshToken((new Storage()).getRefreshToken())
                            .then(data => (new Storage().setAccessToken(data.access_token)));
                        this.getPlayLists();
                    }
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
                this.setState({ trackData: data });
                if (data.data.error) {
                    if (data.data.error.status == 401) {
                        (new Tokens()).refreshToken((new Storage()).getRefreshToken())
                            .then(data => (new Storage()).setAccessToken(data.access_token));
                        this.playListClick(playListId);
                    }
                }
            });
    }

    makePlayListCards(response) {
        let cards = [];
        let playlists = response.data;
        playlists.forEach(element => {
            let card = (
                <div onClick={() => this.playListClick(element.playListId)}>
                    <h3>{element.playListName}</h3>
                    <div>Total Songs: {element.playListAmount}</div>
                    <div>Owner      : {element.playListOwner}</div>
                </div>
            );
            cards.push(card);
        });
        return cards;
    }

    makeSongCards(response) {
        let rows = [];
        let trackData = response.data;
        let metaData = response.metaData;
        
        let topRow = (             
        <div className="song-row-top song-row">
            <div className="song-checkbox-parent">Select</div>
            <div>Liked</div>
            <div className="song-title">Title</div>
            <div className="song-artists">Artists</div>
            <div>Added at</div>
        </div>);
        rows.push(topRow);

        (trackData).forEach(element => {
            let likedText = element.isLiked ? <i class="fa fa-heart"></i> : <i class="fa fa-heart-o"></i>
            let artists = element.artists;
            let displayArtists = Object.keys(artists).join(" ") ;  
            let row = (
                <div className="song-row">
                    <div className="song-checkbox-parent">
                        <input className="song-checkbox" type="checkbox"/>  
                    </div>
                    <div>{likedText}</div>
                    <div className="song-title">{element.name}</div>
                    <div className="song-artists">{displayArtists}</div>
                    <div>{element.added_at}</div>
                </div>)
            rows.push(row);
        });
        console.log(response);
        return rows;
    }

    returnToPlayLists(){
        this.setState({trackData: null, drilledDown: false});
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