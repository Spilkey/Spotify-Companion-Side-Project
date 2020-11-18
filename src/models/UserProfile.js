class UserProfile {
    constructor(authToken) {
        this.authToken = authToken;

      }
    async getProfile(){
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/profile/login?token=` + this.authToken,
        {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        let data = await response.json();
        return data;
    }
}

export default UserProfile;