import React, { useState, useEffect } from 'react';
import { NavLink, Link, Switch, useHistory, BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { parseJwt, getAccessToken, getUser, getAPI } from '../../../utils/helpers';
import Skeleton from 'react-loading-skeleton';
import renderHTML from 'react-render-html';
const Breadcrumb = (props) => {
    const { t } = useTranslation();
    const [text, setText] = useState("")
    const [avt, setAvt] = useState("dist/img/user2-160x160.jpg")
    const [fullName, setFullName] = useState("")
    const [menu, setMenu] = useState([])
    useEffect(() => {
        setText(props.textBreadcrumb)
    }, [props.textBreadcrumb])
    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0 text-dark">{text}</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">{text}</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Breadcrumb;
