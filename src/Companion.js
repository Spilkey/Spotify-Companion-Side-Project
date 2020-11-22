import React, { Component } from 'react';

// Router
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

// Components
import SpotifyLogin from './components/login/SpotifyLogin';

// Client Settings
import { clientId, redirectUri } from './settings';

// CSS
import './App.css';

// Pages
import Home from './pages/home/Home'
import Following from './pages/following/Following'
import Playlists from './pages/playlists/Playlists'
import Analyze from './pages/analyze/Analyze'

// Models 
import UserProfile from './models/UserProfile'
import Tokens from './models/Tokens'
import Storage from './models/Storage'

class Companion extends Component {

    constructor(props) {
        super(props);
        this.storage = new Storage();
        this.tokenObtainer = new Tokens();
        
        let token = this.storage.getAccessToken();  
        let authentication = token || false;
        
        this.state = { apiResponse: "", isAuthed: authentication, token: token };
        this.logout = this.logout.bind(this)
    }

    async callAPI() {
        let authToken = this.state.token;
        let profile = new UserProfile(authToken);
        let data = await profile.getProfile();
        this.setState({ apiResponse: data });
        if(data.data.error){
            if(data.data.error.status == 401){
                this.refreshToken();
            }
        }
    }
    async refreshToken(){
        let refresh = localStorage.getItem('refresh');
        let credentialsNew = await this.tokenObtainer.refreshToken(refresh);
        if(credentialsNew.access_token){
            this.setState({ isAuthed: true, token: credentialsNew.access_token });
            this.storage.setAccessToken(credentialsNew.access_token);
            this.callAPI();

        }else{
            this.logout();
        }

    }
    async getToken(responseData) {
        let code = responseData.code;
        let credentials = await this.tokenObtainer.getToken(code);

        this.setState({ isAuthed: true, token: credentials.data.access_token });
        this.storage.setAccessToken(credentials.data.access_token);
        this.storage.setRefreshToken(credentials.data.refresh_token);                                               
        this.callAPI();

    }

    onSuccess = response => {
        console.log(response);
        this.getToken(response)
    }

    onFailure = response => console.error(response);

    componentDidMount() {
        if (this.state.isAuthed) {
            this.callAPI();
        }
    }

    logout(){
        console.log(this);
        this.setState({ isAuthed: false});
        this.storage.clearStorage();
    }

    getProfilePic(detailedProfile, displayName){
        console.log(detailedProfile)
        let imageDiv;
        const imageUrl= detailedProfile.images;

        if(Array.isArray(imageUrl) && imageUrl.length > 0){
            imageDiv = (
            <div className='user-profile-pic'>
                <div>{displayName}</div>
                <img src={imageUrl[0].url}/>
            </div>)
        }else{
            imageDiv = (
                <div className='user-profile-pic'>
                    <div>{displayName}</div>
                    <img src="images/profile-ph.png"/>
                </div>)
        }
        return imageDiv;
    }

    render() {
        const isAuthed = this.state.isAuthed;
        const profile = {};
        const detailedProfile = this.state.apiResponse.data || {}
        const displayName = this.state.apiResponse.displayName || "";
        let content;

        if (isAuthed) {
            let imageDiv = this.getProfilePic(detailedProfile, displayName);
            content =
                <Router>
                    <div>
                        <div className="top-navybar">
                            <div>
                                <Link to={`/`}>Home</Link>
                                <Link to={`/following`}>Following</Link>
                                <Link to={'/playlists'}>Playlists</Link>
                                <Link to={'/analyze'}>Analyze</Link>
                            </div>
                            <div class='right-nav'>
                                {imageDiv}
                                <a onClick={this.logout}>Logout</a>
                            </div>
                        </div>
                        <main>
                            <Route exact path="/" component={() => <Home profile={profile} data={detailedProfile} logout={this.logout}/>} />
                            <Route exact path="/following" component={() => <Following profile={profile} logout={this.logout}/>} />
                            <Route exact path="/playlists" component={() => <Playlists logout={this.logout}/>} />
                            <Route exact path="/analyze" component={() => <Analyze logout={this.logout}/>} />
                            {/* <Route path="/contacts" component={Contacts} /> */}
                        </main>
                    </div>
                </Router>
        } else {
            content =
                <div className="home-not-loggedin">
                    <div className='home-page-naviagtion'>
                        <div className='nav-left'>
                            <img src='images/spotify-companion-logo.png' height='80px'></img>
                            <h1>Spotify Companion App</h1>
                        </div>
                        <img src='images/listen-on-spotify-logo.png' height='80px'></img>
                        <SpotifyLogin className="spotify-button" buttonText="Login With Spotify" clientId={clientId}
                            redirectUri={redirectUri}
                            onRequest={this.onRequest}
                            onSuccess={this.onSuccess}
                            onFailure={this.onFailure} />
                    </div>
                    <div className='main-image'>
                        <p className='black-box'>
                            Welcome to my Spotify Companion App. In this app you will be able to explore your followed artists, 
                            scroll through your playlists, and analyze public playlists.
                        </p>
                    </div>
                </div>
        }
        return (content);
    }
}

export default Companion;
