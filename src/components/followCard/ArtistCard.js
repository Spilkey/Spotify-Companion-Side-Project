import React, { Component } from 'react';

import './artist.css'

class ArtistCard extends Component {
    constructor(props) {
        super(props);

        this.data = props.artistData;
        this.state = { isFlipped: false };

        this.flipCard = this.flipCard.bind(this)
    }

    makeImageCard() {
        return (
            <div className="artist-card-inner">
                <img src={this.data.image.url} alt={this.data.name}></img>
                <h5>{this.data.name}</h5>
            </div>
        )
    }

    makeBackCard() {
        return (
            <div className="artist-card-inner">
                <div className="close">
                    <div className="close-inner">
                        X
                    </div>
                </div>
                <h5>{this.data.name}</h5>
                <img src={this.data.image.url} alt={this.data.name}></img>
                <div className="flipped-card-row center">
                    <button className="open-spotify-button spotify-button">
                        <a href={this.data.openUrl} target="_blank">Open In Spotify</a>
                    </button>
                </div>
                <div className="flipped-card-row">
                    <div className="flipped-card-heading">
                        Followers:
                    </div>
                    <div className="flipped-card-value">
                        {this.data.follower}
                    </div>
                </div>
                <div className="flipped-card-row">
                    <div className="flipped-card-heading">
                        Type:
                    </div>
                    <div className="flipped-card-value">
                        {this.data.type}
                    </div>
                </div>
                <div className="flipped-card-row">
                    <div className="flipped-card-heading">
                        Music Genres:
                    </div>
                    <div className="flipped-card-value">
                        {this.data.genres}
                    </div>
                </div>

            </div>
        )
    }
    
    flipCard(){
        const cardState = this.state.isFlipped;
        this.setState({isFlipped: !cardState});
    }
    render() {
        let front = this.makeImageCard();
        let back = this.makeBackCard();

        if (!this.state.isFlipped) {
            return (
                <div className="card-click" onClick={this.flipCard}>
                    {front}
                </div>
            )
        } else {
            return (
                <div className="card-click flipped" onClick={this.flipCard}>
                    {back}
                </div>
            )
        }


    }
}
export default ArtistCard;