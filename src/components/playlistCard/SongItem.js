import React, { Component } from 'react';

import '../../components/volume.css';
import './song-item.css';

import Playlist from '../../models/Playlist';
import ReAuth from '../../models/ReAuth';

class SongItem extends Component {
    constructor(props) {
        super(props);
        this.songData = this.props.songData;
        this.playerId = `player-${this.songData.id}`

        this.state = {liked : this.songData.isLiked};

        //models
        this.playListModel = new Playlist();
        this.reAuthenticate = new ReAuth();
        // references
        this.audioRef = React.createRef();
        this.previewDivReference = React.createRef();
        this.playButton = React.createRef();
        this.pauseButton = React.createRef();

        this.heartClick = this.heartClick.bind(this)
    }

    audioControl(element, type) {
        this.audioRef.current.volume = 0.025;
        if (type == 'play') {
            this.audioRef.current.play();

            this.previewDivReference.current.classList.add('volume-animated');

            this.playButton.current.classList.add('hidden');
            this.pauseButton.current.classList.remove('hidden');

        } else {
            this.audioRef.current.pause();

            this.previewDivReference.current.classList.remove('volume-animated');

            this.playButton.current.classList.remove('hidden');
            this.pauseButton.current.classList.add('hidden');
        }
    }

    heartClick(){
        if(this.state.liked){
            this.playListModel.unlikeTracks([this.songData.id])
            .then(data => {
                if (data.data.status != 200) {
                    if (data.data.status == 401) {
                        this.reAuthenticate(this.heartClick(), () => {})
                    }
                    alert("failed to unlike");
                    console.log(data);
                }else{
                    this.setState({liked: false})
                }
            });
        }else{
            this.playListModel.likeTracks([this.songData.id])
            .then(data => {
                if (data.data.status != 200) {
                    if (data.data.status == 401) {
                        this.reAuthenticate(this.heartClick(), () => {})
                    }
                    alert("failed to like");
                    console.log(data);
                }else{
                    this.setState({liked: true})
                }
            });
        }

    }

    setSelected(){

    }

    render() {
        let likedText = this.state.liked ? <i className="fa fa-heart"></i> : <i className="fa fa-heart-o"></i>
        let artists = this.songData.artists;
        let displayArtists = Object.keys(artists).join(" ");
        let audioElm = (
            <div className="audio-top" ref={this.previewDivReference}>
                <audio id={this.playerId} ref={this.audioRef}>
                    <source src={this.songData.preview} type="audio/ogg"></source>
                </audio>
                <button className="play-button" ref={this.playButton} onClick={(e) => this.audioControl(e, "play")}></button>
                <button className="hidden pause-button" ref={this.pauseButton} onClick={(e) => this.audioControl(e, "pause")}></button>
            </div>
        );
        let songPreview = this.songData.preview ? audioElm : (<div></div>);
        let selectedClass = this.props.isSelected ? this.props.className + " selected" :  this.props.className;
        return (
            <div className={selectedClass} onClick={this.props.onClick}>
                <div className="song-checkbox-parent">
                    <input className="song-checkbox" type="checkbox" checked={this.props.isSelected} readOnly/>
                </div>
                <div className="heart-song" onClick={this.heartClick}>{likedText}</div>
                <div className="song-title">{this.songData.name}</div>
                <div className="song-artists">{displayArtists}</div>
                <div>{this.songData.added_at}</div>
                {songPreview}
            </div>
        );
    }
}

export default SongItem;