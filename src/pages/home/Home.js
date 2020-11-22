import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Profile from '../../components/profile/Profile'
class Home extends Component {
    constructor(props){
        super(props);
        let images = this.props.data.images || null;
        this.state = { image: images};

        this.logout = this.props.logout;
    }

    render() {

        return (
            <div className='home-screen-main-wrapper'>
                <div className='home-screen-main'>
                    <Link to="/following">  
                        <div className='home-screen-content'>                  
                                <h3>Following</h3>
                                <div className='line'></div>
                                <p>
                                    Explore all the artist you follow. Click on individual artists to learn some quick info about them. 
                                </p>                          
                        </div>
                    </Link>
                    <Link to="/playlists">
                        <div className='home-screen-content'>                                                   
                                <h3>Playlists</h3>
                                <div className='line'></div>
                                <p>
                                    Examine any of your playlists and quickly select songs to move them, follow their artists, and move to other playlists.
                                </p>
                        </div>
                    </Link>
                    <Link to="/analyze">
                        <div className='home-screen-content'>                           
                                <h3>Analyze</h3>
                                <div className='line'></div>
                                <p>
                                Analyze playlists and songs. Select a from either playlists or songs and learn indepth knowledge about the music.  
                                </p>
                        </div>
                    </Link>
                    <Link to="/">
                        <div className='home-screen-content'>
                            <h3></h3>
                            <div className='line'></div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }

}

export default Home;