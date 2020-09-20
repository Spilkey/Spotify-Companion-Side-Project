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

    render(){
        return (
            <div className="analyze-top">
                <div className="analyze-link">Analyze Playlists</div>
                <div className="analyze-link">Analyze Songs</div>
            </div>
        )
    }
}

export default Analyze;