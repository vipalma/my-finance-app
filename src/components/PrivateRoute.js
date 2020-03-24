import React from "react";
import { Route, Redirect } from "react-router-dom";
import useGlobal from "../store";

const PrivateRoute = ({ component: Component, ...rest }) => {

    const [globalState] = useGlobal();
    
    return(         
        <Redirect to={ {  pathname: "/Login" }} />        
            // <Route {...rest} render={props => auth.isAuthenticated( ) ? 
            // ( <Component {...props} /> ) : 
            // ( <Redirect to={ {  pathname: "/Login", state: { from: props.location } }} />  ) } /> 
            
          );
    
};

export default PrivateRoute;
