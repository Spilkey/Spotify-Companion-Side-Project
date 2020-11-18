const env = require('dotenv');

export const clientId = process.env.REACT_APP_CLIENTID; // Your client id
export const redirectUri = window.location.href.slice(0,-1); // Your redirect uri