import React, { useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next';
import { setAccessToken, parseJwt, isLoggedIn,getUser,postAPI, removeAccessToken } from '../../../../utils/helpers';
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
                <i className="fa fa-user" />
                <span id="userHeader">{getUser()}</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">15 Notifications</span>
                <div className="dropdown-divider"></div>
                <a href="/thong-tin-ca-nhan" className="dropdown-item">
                    <i className="fa fa-user" /> Thông tin tài khoản
                </a>
                <div className="dropdown-divider"></div>
                <span onClick={signout} className="dropdown-item">
                    <i className="fa fa-power-off" /> Đăng xuất
                </span>
                <div className="dropdown-divider"></div>
            </div>

        </li>

    );
};

export default MessagesDropdown;
