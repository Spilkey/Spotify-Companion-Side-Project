import React, { Component } from 'react';

import ArtistCard from '../../components/followCard/ArtistCard'

import Followed from '../../models/getFollowedArtisted'

import '../../components/spinner.css'
import './following.css'

class Following extends Component {
    constructor(props) {
        super(props);
        this.state = { artistData: null, dataLoaded: false, after: null, current: '', pageNum: 1, total: null}
        this._isMounted = false;

        this.pageForward = this.pageForward.bind(this)
        this.pageBack = this.pageBack.bind(this)
        this.beforeStack = [];
    }

    getFollowedInitial(after = null){
        if(!this.state.dataLoaded){
            this.getFollowed(after);
        }
     }

     getFollowed(after = ''){
        let followModel = new Followed(after);
        followModel.getFollowedArtists()
            .then(data => {
                let pageNum = this.beforeStack.length + 1;
                let after = data.data.after;
                let current = data.data.current;
                let total = data.data.total;

                this.setState({ artistData: data, 
                                dataLoaded: true, 
                                after: after, 
                                current: current, 
                                pageNum: pageNum, 
                                total: total});
            });
     }

    componentDidMount() {
        this._isMounted = true;
        this.getFollowedInitial();
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
    
    makePaging(){
        let total = this.state.total;
        let pageTotal = Math.floor(total / 18) + 1;
        let currentPage = this.state.pageNum;
        let currentPageAmountString;
        if(pageTotal > 2){
            let lastPageAmount = (currentPage-1)*18;
            let currentPageAmount = currentPage*18;
            if(pageTotal !== currentPage){
                currentPageAmountString = `Viewing ${lastPageAmount + 1} - ${currentPageAmount} of ${total}  |  Page ${currentPage} of ${pageTotal}`;
            }else{
                currentPageAmountString = `Viewing ${lastPageAmount + 1} - ${lastPageAmount + (total - lastPageAmount)} of ${total} |  Page ${currentPage} of ${pageTotal}`;
            }
        }else{
            currentPageAmountString = `Viewing 0 - ${total}`;
        }
        return (
            <div className="bottom-buttons">
                <button onClick={this.pageBack}>&lt;</button>
                <div>{currentPageAmountString}</div>
                <button onClick={this.pageForward}>&gt;</button>
            </div>
        );
    }
//
    pageForward() {
        let after = this.state.after;
        let current = this.state.current;
        
        if(after){
            this.beforeStack.push(current);
            this.setState({artistData: null});
            this.getFollowed(after)
        }
    }

    pageBack() {
        let before = this.beforeStack.pop();
        this.setState({artistData: null});
        this.getFollowed(before);
    }
    render(){
        const dataLoaded = this.state.artistData;
        let content;
        let paging;
        console.log(dataLoaded);
        if (dataLoaded) {
            let grid = this.makeCardGrid(dataLoaded.data.artists);
            content = <div className="artist-grid">{grid}</div>
            paging = this.makePaging();
        } else {
            content = <div class="loader">Loading...</div>
        }
        return (
            <div>
                {content}
                {paging}
            </div>
        )
    }

}

export default Following;