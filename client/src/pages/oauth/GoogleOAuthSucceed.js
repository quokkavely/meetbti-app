import { useEffect } from "react";
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from "react-router-dom";

const GoogleOAuthSucceed = () => {
    const navigate = useNavigate();
    const login = useAuth();

    useEffect(() => {
        login(/* token, email, memberId */);
        navigate('/');
    }, []);

    return (
        <div>
            
        </div> 
    );
}
export default GoogleOAuthSucceed;