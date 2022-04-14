import React from "react";
import { NavLink } from "react-router-dom";

function Home(props) {
    console.log(props);

    return (
        props.isAuthenticated ?
            <>
                <h1>Welcome {props.user.email}</h1>
            </> :
            <>
                <>
                    please
                    <NavLink
                        className="navbar-item"
                        activeClassName="is-active"
                        to="/Login"
                        exact
                    >
                        Login
                    </NavLink>
                </>

            </>
    )
}

export default Home;