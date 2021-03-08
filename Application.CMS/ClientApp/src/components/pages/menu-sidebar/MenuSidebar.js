import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { parseJwt, getAccessToken } from '../../../utils/helpers';
import Skeleton from 'react-loading-skeleton';
const MenuSidebar = ({ user }) => {
    const { t } = useTranslation();
    const [avt, setAvt] = useState("dist/img/user2-160x160.jpg")
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">

            <a href="index3.html" className="brand-link">
                <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"
                    style={{ opacity: .8 }} />
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </a>


            <div className="sidebar">

                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={avt || <Skeleton circle={true} height={50} width={50} />} className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{parseJwt().FullName}</a>
                    </div>
                </div>


                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                        <li className="nav-item has-treeview menu-open">
                            <Link to="dashboard" className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Dashboard
                                </p>
                            </Link>

                        </li>
                        <li className="nav-item">
                            <a href="pages/widgets.html" className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Widgets
                <span className="right badge badge-danger">New</span>
                                </p>
                            </a>
                        </li>
                        <li className="nav-item has-treeview">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-copy"></i>
                                <p>
                                    Layout Options
                <i className="fas fa-angle-left right"></i>
                                    <span className="badge badge-info right">6</span>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="pages/layout/top-nav.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Top Navigation</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Top Navigation + Sidebar</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/layout/boxed.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Boxed</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/layout/fixed-sidebar.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Fixed Sidebar</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/layout/fixed-topnav.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Fixed Navbar</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/layout/fixed-footer.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Fixed Footer</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/layout/collapsed-sidebar.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Collapsed Sidebar</p>
                                    </a>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </nav>

            </div>

        </aside>
    );
};


export default MenuSidebar;
