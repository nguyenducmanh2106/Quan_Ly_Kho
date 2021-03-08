import React, { useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next';
import { setAccessToken, parseJwt, isLoggedIn, postAPI, removeAccessToken } from '../../../../utils/helpers';
const MessagesDropdown = () => {
    const history = useHistory()
    const dropdownRef = useRef(null);
    const { t } = useTranslation();

    const [dropdownState, updateDropdownState] = useState({
        isDropdownOpen: false
    });
    const signout = () => {
        removeAccessToken();
        history.replace('/')
    }
    return (
        <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="fas fa-tasks"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <div className="dropdown-divider"></div>
                <Link to="/menu" className="dropdown-item">
                    <i className="fa fa-bars" aria-hidden="true"></i> Cấu hình menu
                </Link>
                <div className="dropdown-divider"></div>
                <a href="/thong-tin-ca-nhan" className="dropdown-item">
                    <i className="icon-user"></i> Người dùng
                </a>
               
               
                <div className="dropdown-divider"></div>
            </div>

        </li>

    );
};

export default MessagesDropdown;
