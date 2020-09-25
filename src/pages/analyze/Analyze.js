import React, { Component } from 'react';

import AnalyzePlaylist from '../../components/analyzeCard/AnalyzePlaylist'
import AnalzyeSong from '../../components/analyzeCard/AnalyzeSong'

import './analyze.css'


class Analyze extends Component {
    constructor(props) {
        super(props);
        this.logout = this.props.logout;
        this.state = { whichPage: 0 };
    }

    selectPage(page) {
        this.setState({ whichPage: page })
    }
    render() {
        let page = this.state.whichPage;
        let content;
        let buttons;
        if (page) {
            content = page === 1 ? <AnalyzePlaylist /> : <AnalzyeSong />
            buttons = (
                <div className="analyze-top back">
                    <div onClick={e => this.selectPage(0)} logout={this.logout} className="analyze-link back">Back</div>
                </div>
            );
        } else {
            buttons = (
                <div className="analyze-top">
                    <div onClick={e => this.selectPage(1)} logout={this.logout} className="analyze-link">Analyze Playlists</div>
                    <div onClick={e => this.selectPage(2)} logout={this.logout} className="analyze-link">Analyze Songs</div>
                </div>
            );
        }
        return (
            <div>
                {buttons}
                {content}
            </div>
        )
    }
}

export default Analyze;