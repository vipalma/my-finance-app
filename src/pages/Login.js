import React, { useEffect } from "react";
import "../css/login/login.css";
import useGlobal from "../store";

const Login = () => {

  const [globalState] = useGlobal();
  const { fireBase } = globalState;
  


  return (
    <div className="background">
      <div className="lognModal">
        <div className="title">
          <h1>Welcome to My Finance</h1>
        </div>
        <div className='modalButton'>
          <div className="loginButton" onClick={() => fireBase.signInWithGoogle()}>
            <h4>Sign in</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
