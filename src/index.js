import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "./react-auth0-wrapper";
import config from "./auth_config.json";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
    // Temporary Firefox workaround
    window.location.hash = window.location.hash; // eslint-disable-line no-self-assign
      
  window.history.replaceState(
      {},
      document.title,
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  };

  ReactDOM.render(
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
  >
      <App />
    </Auth0Provider>,
    document.getElementById("root")
  );  

// ReactDOM.render( 
// <App />
// ,
// document.getElementById('root'));