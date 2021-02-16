import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthorizationContext} from '../Context/AuthorizationContext'

const UserRoutes = ({component: Component, ...rest}) => {
    const {isAuthenticated, user} = useContext(AuthorizationContext)
    return (
        <Route {...rest} render={props =>{
            if(!isAuthenticated){
                return <Redirect to={{pathname: './login', 
                                state: {from: props.location}}} />
            }
            return <Component {...props} />
        }} />
    )
}

export default UserRoutes
