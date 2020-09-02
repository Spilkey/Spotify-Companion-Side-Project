import React, { Component } from 'react';

import './profile.css';

class Profile extends Component {
    /**
     * 
     * @param {Object} props profile data
     */
    constructor(props) {
        super(props);
        this.state = { profileContents: props.profile };
    }
    render() {
        const profileData = this.state.profileContents;
        let listItems;
        if(profileData && Array.isArray(profileData)){
            listItems = profileData.map((value, key) =>                
                <div className="flexy-profile">
                    <div className="profile-heading">
                        {value.heading}
                    </div>
                    <div className="profile-data">
                        {value.value}
                    </div>
                </div>
            );
        }
        
        return (
            <div className="profile-top">
                {this.props.imageDiv}
                {listItems}
            </div>
        )
    }
}

export default Profile;
