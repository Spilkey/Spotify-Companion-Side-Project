import React, { Component } from 'react';

import ArtistCard from '../../components/followCard/ArtistCard'

import Followed from '../../models/getFollowedArtisted'

import '../../components/spinner.css'
import './following.css'

class Following extends Component {
    constructor(props) {
        super(props);
        this.state = { artistData: null, dataLoaded: false }

        this._isMounted = false;

        
    }

    getFollowed(){
        if(!this.state.dataLoaded){
            let followModel = new Followed('');
            followModel.getFollowedArtists()
                .then(data => this.setState({ artistData: data, dataLoaded: true }));
        }

     }


    componentDidMount() {
        this._isMounted = true;
        this.getFollowed();
    }

    populateCards(artists) {
        let cards = []
        artists.forEach(element => {
            cards.push(<ArtistCard artistData={element} />)
        });
        console.log(cards);
        return cards;
    }

    makeCardGrid(artists) {
        let cards = this.populateCards(artists);
        let listItems = cards.map((value) =>
            <div className="artist-card" tabIndex='0'>
                {value}
            </div>
        );
        return listItems;
    }
    render() {
        const dataLoaded = this.state.artistData;
        let content;
        console.log(dataLoaded);
        if (dataLoaded) {
            let grid = this.makeCardGrid(dataLoaded.data.artists);
        content = <div className="artist-grid">{grid}</div>
        } else {
            content = <div class="loader">Loading...</div>
        }
        return (
            <div>
                {content}
            </div>
        )
    }

}

export default Following;