import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({setIsAuthenticated}){
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token') && localStorage.getItem !== 'undefined'){
            setIsAuthenticated(true);
            if(location.pathname === '/' || location.pathname === '/signup'){
                navigate('/employee-from', {replace:false});
                navigate('/employee-report', {replace:false});
            }
        }
    },[location, navigate, setIsAuthenticated])
    return(
        null
    );
}

export default RefreshHandler;
