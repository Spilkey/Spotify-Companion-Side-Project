import React, { Component } from 'react';

import '../../components/spinner.css';

import './playlists.css'

import Playlist from '../../models/Playlist'

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