import React, { Component } from 'react';

// Router
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Playlist from '../../models/Playlist'
import Storage from '../../models/Storage'
import Tokens from '../../models/Tokens'

import AnalyzePlaylist from '../../components/analyzeCard/AnalyzePlaylist'
import AnalzyeSong from '../../components/analyzeCard/AnalyzeSong'

import './analyze.css'


class Analyze extends Component {
    constructor(props){
        super(props);
        this.logout = this.props.logout;
        this.state = {whichPage: 0};
    }

    selectPage(page){
        this.setState({whichPage: page})
    }
    render(){
        let page = this.state.whichPage;
        let content;
        if(page){
            content = page === 1 ? <AnalyzePlaylist/> : <AnalzyeSong/>
        }
        return (
            <div>
                <div className="analyze-top">
                    <div onClick={e => this.selectPage(1)} className="analyze-link">Analyze Playlists</div>
                    <div onClick={e => this.selectPage(2)} className="analyze-link">Analyze Songs</div>
                </div>
                {content}
            </div>
        )
    }
}

export default Analyze;