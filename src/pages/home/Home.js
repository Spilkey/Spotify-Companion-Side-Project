import React, { Component } from 'react';

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
            <div class='home-screen-main-wrapper'>
                <div class='home-screen-main'>
                    <div className='home-screen-content'></div>
                    <div className='home-screen-content'></div>
                    <div className='home-screen-content'></div>
                    <div className='home-screen-content'></div>
                </div>
            </div>
        )
    }

}

export default Home;