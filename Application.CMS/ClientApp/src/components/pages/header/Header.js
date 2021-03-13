import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import Messages from './messages-dropdown/MessagesDropdown';
import CauHinh from './CauHinh/CauHinh';
import Notifications from './notifications-dropdown/NotificationsDropdown';
import Profile from './profile/Profile';
//import Languages from './languages-dropdown/LanguagesDropdown';
//import Config from './user-dropdown/UserDropdown';

const Header = ({toggleMenuSidebar}) => {
    const [t] = useTranslation();
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{ zIndex: 800 }}>

            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="index3.html" className="nav-link">Home</a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="#" className="nav-link">Contact</a>
                </li>
            </ul>

            <form className="form-inline ml-3">
                <div className="input-group input-group-sm">
                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                    <div className="input-group-append">
                        <a className="btn btn-navbar" type="submit">
                            <i className="fas fa-search"></i>
                        </a>
                    </div>
                </div>
            </form>


            <ul className="navbar-nav ml-auto">
                <CauHinh />
                <Profile />
            </ul>
        </nav>
    );
};

export default Header;
