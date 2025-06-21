import React from "react";
import { useAuth } from "../context/AuthContext";

const UserPanel =() => {

    const { user, logout } = useAuth();

  // BACKEND INTEGRATION: Pobierz dane użytkownika z API
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const response = await apiClient.get('/user/data');
  //     // ...obsłuż dane
  //   };
  //   fetchUserData();
  // }, []);

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