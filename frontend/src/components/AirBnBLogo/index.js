import "./AirBnBLogo.css";
import { Link } from "react-router-dom";


function AirBnBLogo() {

    return (
        <Link to="/">
            <img src="/AirDnDLogo.png" alt="Logo" width={120} height={40} />
        </Link>
    );
}


export default AirBnBLogo;
