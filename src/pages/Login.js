import React, { useEffect } from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import "../css/login/login.css";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="background">
      <div className="lognModal">
        <div className="title">
          <h1>Welcome to My Finance</h1>
        </div>
        <div className='modalButton'>
          <div className="loginButton" onClick={() => loginWithRedirect()}>
            <h4>Sign in</h4>
          </div>
        </div>
      </div>
      {/* <header>
      <div  className='container'>
      <img src="https://rocketseat.com.br/static/images/gostack/logo-rocketseat.svg" alt="Rocketseat"></img>
        <nav>
          <ul>
            <li>
              <a href="/html/">Quem somos</a>
            </li>
            <li>
              <a href="/css/">Como funciona</a>
            </li>
            <li>
              <a href='' onClick={() => loginWithRedirect()}>Entrar</a>
            </li>
          </ul>
        </nav>
        </div>
      </header> */}
      {/* <button onClick={() => loginWithRedirect()}>Login</button> */}
    </div>
  );
};

export default Login;
