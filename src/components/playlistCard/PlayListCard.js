import React, { Component } from 'react';

class PlayListCard extends Component {
    constructor(props) {
        super(props);
        this.data = props.cardData || null;
    }

    render() {
        return (
            <div onClick={this.props.onClick}>
                <h3>{this.data.playListName}</h3>
                <div>Total Songs: {this.data.playListAmount}</div>
                <div>Owner      : {this.data.playListOwner}</div>
            </div>
        );
    }
}

export default PlayListCard;