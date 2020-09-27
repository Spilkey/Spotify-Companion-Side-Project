import React, { Component } from 'react';

import './components.css'
import '../spinner.css'

import VisualizeFeatures from './Visualize';
import AnalyzePlaylistRow from './AnalyzePlaylistRow';

import Playlist from '../../models/Playlist'
import Storage from '../../models/Storage'
import Tokens from '../../models/Tokens'
import Search from '../../models/Search'
import Analyze from '../../models/Analyze'
import appContent from '../../models/ContentDesc'




class AnalyzePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = { playListData: null, searchData: null, loadingAnalyzeData: false, analyzeData: null, selectedPlayListData: null }

        this.tokens = new Tokens();
        this.storage = new Storage();
        this.playListModel = new Playlist();
        this.search = new Search();
        this.analyzeDataObtainer = new Analyze();

        this.logout = this.props.logout;
    }

    getPlayLists() {
        this.playListModel.getPlayLists()
            .then(data => {
                if (data.data.error) {
                    if (data.data.error.status == 401) {
                        this.tokens.refreshToken(this.storage.getRefreshToken())
                            .then(data => {
                                if (data.access_token) {
                                    this.storage.setAccessToken(data.access_token);
                                    this.getPlayLists();
                                } else {
                                    this.logout();
                                }
                            });
                    }
                } else {
                    this.setState({ playListData: data });
                }
            });
    }

    componentDidMount() {
        this._isMounted = true;
        this.getPlayLists();
    }

    analyzeSelectedPlaylist(playlistId) {
        console.log(playlistId);

        this.analyzeDataObtainer.getPlayListAnalysis(playlistId)
            .then(data => {
                console.log(data)
                if (data.error) {
                    if (data.error.status == 401) {
                        this.tokens.refreshToken(this.storage.getRefreshToken())
                            .then(data => {
                                if (data.access_token) {
                                    this.storage.setAccessToken(data.access_token);
                                    this.getPlayLists();
                                } else {
                                    this.logout();
                                }
                            });
                    }
                } else {
                    this.setState({ analyzeData: data, loadingAnalyzeData: false });
                }
            });
    }


    createPlayLists(data) {
        let playlists = data.data;

        return playlists.map((value) =>
            <div className="my-playlist-row" onClick={e => { this.analyzeSelectedPlaylist(value.playListId); this.setState({ loadingAnalyzeData: true, selectedPlayListData: value }); }}>
                <div>{value.playListName} by {value.playListOwner}</div>
            </div>
        );
    }

    createPlayListsSearch(data) {
        let playlists = data;
        console.log(data);

        return playlists.map((value) =>
            <div className="my-playlist-row" onClick={e => { this.analyzeSelectedPlaylist(value.id); this.setState({ loadingAnalyzeData: true, selectedPlayListData: value }); }}>
                <div>{value.name || ""} by {value.owner.display_name}</div>
            </div>
        );
    }

    onYup(e) {
        console.log(e)
        let value = e.target.value;
        this.search.searchPlaylists(value)
            .then(data => {
                console.log(data);
                if (data.results.error) {
                    if (data.results.error.status == 401) {
                        this.tokens.refreshToken(this.storage.getRefreshToken())
                            .then(data => {
                                if (data.access_token) {
                                    this.storage.setAccessToken(data.access_token);
                                    this.onYup(e);
                                } else {
                                    this.logout();
                                }
                            });
                    }
                } else {
                    this.setState({ searchData: data.results.playlists.items });
                }
            });
    }

    createGraphs(analysisData) {
        let graphs = [];
        let features = analysisData.results;

        let duration = <AnalyzePlaylistRow data={features.duration} 
                                           title="Duration" 
                                           desc={appContent.analyze.duration}
                                           img=""
                                           faClass="fa-clock-o"
                                           label="Durations in Seconds" />

        let key = <AnalyzePlaylistRow data={features.key} 
                                      title="Key" 
                                      desc={appContent.analyze.key}
                                      img="images/analyze-images/key-signatures-chart.png"
                                      label="Key Signature" />

        let tempo = <AnalyzePlaylistRow data={features.tempo} 
                                      title="Tempo" 
                                      desc={appContent.analyze.tempo}
                                      img="images/analyze-images/tempo.png"
                                      label="BPM" />

        let timeSig = <AnalyzePlaylistRow data={features.time_sig} 
                                      title="Time Signature" 
                                      desc={appContent.analyze.timeSig}
                                      img="images/analyze-images/time-signature.png"
                                      label="Number of Beats per Measure" />
        // for (const feature in features) {
        //     console.log(feature);
        //     let graph = (<VisualizeFeatures data={features[feature]} title={feature}/>);
        //     graphs.push(graph);
        // }
        graphs.push(duration);
        graphs.push(key);
        graphs.push(tempo);
        graphs.push(timeSig);
        // graphs.push(duration2);
        return graphs;
    }

    render() {
        let playListData = this.state.playListData;
        let searchData = this.state.searchData;
        let analyzeData = this.state.analyzeData;

        let longLoading = this.state.loadingAnalyzeData;

        let playlists;
        let playListSearch;
        let mainContent;

        if (playListData) {
            playlists = this.createPlayLists(playListData);
        }
        if (searchData) {
            playListSearch = this.createPlayListsSearch(searchData);
        }
        if (longLoading) {
            mainContent = (<div className="loader"></div>);
        } else if (analyzeData) {
            let graphs = this.createGraphs(analyzeData);
            let selectedPlayListData = this.state.selectedPlayListData;
            mainContent = (
                <div>
                    <h2 className="playlist-heading" >{selectedPlayListData.name || selectedPlayListData.playListName || "No title"}</h2>
                    <h3 className="playlist-heading"> Total Songs: {analyzeData.results.duration.length}</h3>
                    <div className="analyze-bottom-grid-graphs">
                        {graphs}
                    </div>
                </div>
            );
        } else {
            mainContent = (
                <div className="analyze-bottom-grid">
                    <div className="column-parent">
                        <h2 className="spacer">Select one of your playlists</h2>
                        <div className="search not-visible">
                            <i className="fa fa-search"></i>
                            <input onKeyUp={e => this.onYup(e)} placeholder="Search Playlists"></input>
                        </div>
                        <div className="column">

                            {playlists}
                        </div>
                    </div>
                    <h2 className="spacer"> OR</h2>
                    <div className="column-parent">
                        <h2 className="spacer">Search a playlist</h2>
                        <div className="search">
                            <i className="fa fa-search"></i>
                            <input onKeyUp={e => this.onYup(e)} placeholder="Search Playlists"></input>
                        </div>
                        <div className="column">
                            {playListSearch}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div>
                {mainContent}
            </div>
        )
    }
}

export default AnalyzePlaylist;