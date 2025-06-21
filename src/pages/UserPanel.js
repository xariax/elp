import React from "react";
import { useAuth } from "../context/AuthContext";

const UserPanel =() => {

    const { user, logout } = useAuth();
    return(
        <div>
        <h1>zalogowany jako użytkownik
            <p>{user?.login}</p>
        </h1>
        <button onClick={logout}>Wyloguj</button>
        </div>
    )


}

export default UserPanel;