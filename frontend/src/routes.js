import React from "react"; 
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"; 

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

import Login from "./pages/Login"; 
import Register from "./pages/Register";
import { isAuthenticated } from "./services/auth"; 

const LoginRoute = ({component: Component, ...rest}) => (

        
        <Route 
            {...rest} 
            render={props => 
                isAuthenticated() ? (
                    <Redirect to={{ pathname: "/", state: {from : props.location }}}/>
                ): (
                    <Component {...props}/>
                )}
        />
        
);







export default function Routes(){
    console.log("********IS AUTHENTICATED LOG************", isAuthenticated());
    return (
        <BrowserRouter>
            <ToastContainer 
                positon="top-center" 
                autoClose={2500} 
                hideProgressBar={false} 
                newestOnTop={false}
                closeOnClick 
                rtl={false} 
                pauseOnVisibilityChange 
                draggable 
                pauseOnHover
            />
            <Switch>
                    <LoginRoute exact path="/login" component={Login}/>   
                    <LoginRoute exact path="/register" component={Register}/>
            </Switch>
        </BrowserRouter>
    );
}

