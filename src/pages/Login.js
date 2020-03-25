import React, { useState } from "react";
import "../css/login/login.css";
import useGlobal from "../store";
import { Form, Divider } from "semantic-ui-react";
import btn_google from "../images/btn_google.png";

const Login = () => {
  const [globalState] = useGlobal();
  const { fireBase, firebaseAppAuth } = globalState;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const signIn = () => {
    firebaseAppAuth.signInWithEmailAndPassword(email, password).catch(error => {
      setError(error);
    });
  };

  const signInWithGoogle = () => {
    fireBase.signInWithGoogle();
  };

  return (
    <div className="background">
      <div className="lognModal">
        {/* {showMessageBox()} */}
        <div className="title">
          <h1>Welcome to My Finance</h1>
        </div>
        <div className="loginForm">
          <Form className="formLogin">
            <Form.Field>
              <label>Email</label>
              <input
                placeholder="name@youremail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <div className='messageBox'>
              <a className="loginMessage">{error.message}</a>
              </div>
            </Form.Field>
          </Form>
        </div>
        <div className="modalButton">
          <div className="loginButton" onClick={signIn}>
            <h4>Sign in</h4>
          </div>
        </div>
        <div className='divDivider'>
          <Divider horizontal>Or</Divider>
        </div>
        <div className='divSocialBtn'>
          <img
            className="btnGoogle"
            src={btn_google}
            onClick={signInWithGoogle}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Login;
