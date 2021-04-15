import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

const Navigation=({userObj})=>(
<nav>
    <ul>
        <li>
            <Link to="/" className="toHome">
                <FontAwesomeIcon icon={faTwitter} size="3x" color="#00acee"/>
            </Link></li>
        <li>
            <Link to="/profile" className="toProfile">
                <FontAwesomeIcon icon={faUserCircle} size="5x" color="#00acee"/>
                <span style={{marginTop:10}}>
                    {userObj.displayName}의 프로필
                </span>
            </Link>
        </li>
    </ul>
</nav>
);

export default Navigation;