import React, { Component } from 'react';

import '../../components/spinner.css';

import './playlists.css'

import Playlist from '../../models/Playlist'
import Storage from '../../models/Storage'
import Tokens from   '../../models/Tokens'

class Playlists extends Component {
    constructor(props) {
        super(props);
        this.state = { playListData: null, drilledDown: false, trackData: null  };
        this._isMounted = false;
        this.playListModel = new Playlist();
    }


    getPlayLists() {
        this.playListModel.getPlayLists()
            .then(data => {
                this.setState({ playListData: data});
                if(data.data.error){
                    if(data.data.error.status == 401){
                        (new Tokens()).refreshToken((new Storage()).getRefreshToken())
                        .then(data =>(new Storage().setAccessToken(data.access_token)));
                        this.getPlayLists();
                    }
                }
                
            });
    }

    componentDidMount() {
        this._isMounted = true;
        this.getPlayLists();
    }

    playListClick(playListId){
        this.setState({drilledDown: true})
        this.playListModel.getPlayList(playListId)            
        .then(data => {
            this.setState({trackData: data });
            if(data.data.error){
                if(data.data.error.status == 401){
                    (new Tokens()).refreshToken((new Storage()).getRefreshToken())
                    .then(data =>(new Storage()).setAccessToken(data.access_token));
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

    makeSongCards(response){
        let rows = [];
        console.log(response);
    }
    render() {
        let response = this.state.playListData;
        let trackData = this.state.trackData;
        let drilledDown = this.state.drilledDown;
        let loader = <div className="loader"></div>;
        let content;
        if (response) {
            if(!drilledDown){
                console.log(response);
                let cards = this.makePlayListCards(response);
                content = cards.map((value) =>
                    <div>{value}</div>
                )
            }else{
                if(trackData){
                    this.makeSongCards(trackData);
                }else{
                    content = loader;
                }
            }
        } else {
            content = loader;
        }

        return (

            <div className="play-list-grid">
                {content}
            </div>
        )

    }
}

export default Playlists;