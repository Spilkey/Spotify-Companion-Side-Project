import React, { Component } from 'react';

import Profile from '../../components/profile/Profile'
class Home extends Component {
    constructor(props){
        super(props);
        let images = props.data.images || null;
        this.state = { image: images};
    }

    render() {
        let imageDiv;
        const imageArr= this.state.image
        if(Array.isArray(imageArr) && imageArr.length){
            imageDiv = <img src={this.state.image[0]}/>
        }else{
            imageDiv = <img src="images/profile-ph.png"/>
        }
        return (
            <div>
                <Profile profile={this.props.profile} imageDiv={imageDiv}> 
                </Profile>

                <p>
                    
                </p>
            </div>
        )
    }

}

export default Home;