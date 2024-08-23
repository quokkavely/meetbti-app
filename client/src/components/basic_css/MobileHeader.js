import './MobileHeader.css';
import { Link } from "react-router-dom";

function MobileHeader(){
    return (
        <div>
            <Link to='/' className="mobile-header">
                <img src="Main-logo.png" className="small-logo"></img>
                <img src='logo192.png' className='back-icon'></img>
            </Link>
        </div>
    );
}
export default MobileHeader;