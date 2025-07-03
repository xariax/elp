import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

const LoggedAsText = ()=>  {
    const { user }  = useAuth();
    const location = useLocation();
    return (
           <div style={{marginTop:'-30px'}}>
                <p style={{fontSize:10, display:'flex',justifyContent:'flex-end'}}>Zalogowany jako:{user?.name}</p>
                <p style={{fontSize:10, display:'flex',justifyContent:'flex-end', marginBottom:'20px'}}>Uprawnienia: {user?.role === 'admin' ? 'Administator' : 'Operator'}</p>
                <p style={{fontSize:10, display:'flex',justifyContent:'flex-start',marginTop:'-40px'}}>Obecna ścieżka: <strong>{location.pathname}</strong></p>
                </div>
    )
}

export default LoggedAsText;
