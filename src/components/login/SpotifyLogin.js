import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PopupWindow from './PopupWindow';
import { toQuery } from './utils';

class SpotifyLogin extends Component {
    static propTypes = {
        buttonText: PropTypes.string,
        children: PropTypes.node,
        className: PropTypes.string,
        clientId: PropTypes.string.isRequired,
        onRequest: PropTypes.func,
        onSuccess: PropTypes.func,
        onFailure: PropTypes.func,
        redirectUri: PropTypes.string.isRequired,
        scope: PropTypes.string,
    }

    static defaultProps = {
        buttonText: 'Sign in with Spotify',
        scope: 'user-read-private ',
        onRequest: () => { },
        onSuccess: () => { },
        onFailure: () => { },
    }

    onBtnClick = () => {
        const { clientId, redirectUri } = this.props;
        const search = toQuery({
            client_id: clientId,
            response_type: 'code',
            scope: "user-read-private user-read-email user-follow-read user-library-read ",
            state: "123",
            redirect_uri: redirectUri,

        });
        console.log(search);
        const popup = this.popup = PopupWindow.open(
            'spotify-authorization',
            `https://accounts.spotify.com/authorize?${search}`,
            { height: 1000, width: 600 }
        );

        this.onRequest();
        popup.then(
            data => this.onSuccess(data),
            error => this.onFailure(error)
        );
    }

    onRequest = () => {
        this.props.onRequest();
    }

    onSuccess = (data) => {
        if (!data.code) {
            return this.onFailure(new Error('\'code\' not found'));
        }
        this.props.onSuccess(data);


        

        
    }

    onFailure = (error) => {
        this.props.onFailure(error);
    }

    render() {
        const { className, buttonText, children } = this.props;
        const attrs = { onClick: this.onBtnClick };

        if (className) {
            attrs.className = className;
        }

        return <button {...attrs}>{children || buttonText}</button>;
    }
}

export default SpotifyLogin;