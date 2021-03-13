import React, { useState, useEffect } from 'react';
import { NavLink, Link, Switch, useHistory, BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { parseJwt, getAccessToken, getUser, getAPI } from '../../../utils/helpers';
import Skeleton from 'react-loading-skeleton';
import renderHTML from 'react-render-html';
const MenuSidebar = () => {
    const { t } = useTranslation();
    let history = useHistory();
    const [avt, setAvt] = useState("dist/img/user2-160x160.jpg")
    const [fullName, setFullName] = useState("")
    const [menu, setMenu] = useState([])
    const onHandleClick = (item) => {
        console.log(item)
        var itemClick = document.querySelectorAll("ul.nav-sidebar a.nav-link");
        for (var value of itemClick) {
            if (value.getAttribute('href') == item.url) {
                history.push(item.url)
                value.className += " nav-link active";
                console.log(value.parentNode.parentNode.parentNode.childNodes[0]);
                let parent = value.parentNode.parentNode.parentNode.childNodes[0];
                if (parent.getAttribute("href")) {
                    parent.className += " nav-link active"
                }
                else {
                    if (parent.tagName == "li") {
                        parent.className += " nav-link active"
                    }
                }
            }
            else {
                value.className = "nav-link"
            }
        }

    }
    useEffect(() => {
        async function getData() {
            var fetchData = await getAPI(`api/menu/raw_menu`);
            if (fetchData.status == true) {
                setMenu(fetchData.result)
            }
        }

        //gọi hàm
        getData();
        return () => {
            //setAction(false)
        }
    }, [])

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
                        <img src={avt} className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{getUser()}</a>
                    </div>
                </div>
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {menu.length > 0 ? menu.map((item, index) => {

                            return (
                                <li key={index} className={item.childNode.length > 0 ? "nav-item has-treeview" : "nav-item"}>

                                    <Link to={item.url || item.url == "#" ? item.url : ""} className="nav-link" onClick={() => onHandleClick(item)}>
                                        <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                                        <p>
                                            {item.name}
                                            {item.childNode.length > 0 ? renderHTML('<i className="fas fa-angle-left right"></i>') : ''}
                                        </p>
                                    </Link>
                                    <ul className="nav nav-treeview">
                                        {item.childNode.length > 0 ? item.childNode.map((itemChild, indexChild) => {
                                            return (

                                                <li className="nav-item">

                                                    <Link to={itemChild.url == "#" || itemChild.url ? itemChild.url : ""} className="nav-link" onClick={() => onHandleClick(itemChild)}>
                                                        <span dangerouslySetInnerHTML={{ __html: itemChild.icon }} />
                                                        <p>{itemChild.name}</p>
                                                        {itemChild.childNode.length > 0 ? renderHTML('<i className="fas fa-angle-left right"></i>') : ''}
                                                    </Link>
                                                    <ul className="nav nav-treeview">
                                                        {itemChild.childNode.length > 0 ? itemChild.childNode.map((itemChild1, indexChild1) => {
                                                            return (

                                                                <li className="nav-item">
                                                                    <Link to={itemChild1.url || itemChild1.url == "#" ? itemChild1.url : ""} className="nav-link" onClick={onHandleClick}>
                                                                        <span dangerouslySetInnerHTML={{ __html: itemChild1.icon }} />
                                                                        <p>{itemChild1.name}</p>
                                                                        {itemChild1.childNode.length > 0 ? renderHTML('<i className="fas fa-angle-left right"></i>') : ''}
                                                                    </Link>
                                                                    <ul className="nav nav-treeview">
                                                                        {itemChild1.childNode.length > 0 ? itemChild1.childNode.map((itemChild2, indexChild2) => {
                                                                            return (
                                                                                <li className="nav-item">
                                                                                    <Link to={itemChild2.url || itemChild2.url == "#" ? itemChild2.url : ""} className="nav-link" onClick={onHandleClick}>
                                                                                        <span dangerouslySetInnerHTML={{ __html: itemChild2.icon }} />
                                                                                        <p>{itemChild2.name}</p>
                                                                                        {itemChild2.childNode.length > 0 ? renderHTML('<i className="fas fa-angle-left right"></i>') : ''}
                                                                                    </Link>
                                                                                    <ul className="nav nav-treeview">
                                                                                        {itemChild2.childNode.length > 0 ? itemChild2.childNode.map((itemChild3, indexChild3) => {
                                                                                            return (
                                                                                                <li className="nav-item">
                                                                                                    <Link to={itemChild3.url || itemChild3.url == "#" ? itemChild3.url : ""} className="nav-link" onClick={onHandleClick}>
                                                                                                        <span dangerouslySetInnerHTML={{ __html: itemChild3.icon }} />
                                                                                                        <p>{itemChild3.name}</p>
                                                                                                        {itemChild3.childNode.length > 0 ? renderHTML('<i className="fas fa-angle-left right"></i>') : ''}
                                                                                                    </Link>
                                                                                                </li>

                                                                                            )
                                                                                        }) : ""}
                                                                                    </ul>
                                                                                </li>

                                                                            )
                                                                        }) : ""}
                                                                    </ul>
                                                                </li>

                                                            )
                                                        }) : ""}
                                                    </ul>
                                                </li>

                                            )
                                        }) : ""}
                                    </ul>
                                </li>
                            )
                        }) : <Skeleton height={400} />}
                    </ul>
                </nav>
            </div>
        </aside>

    );
};


export default MenuSidebar;
