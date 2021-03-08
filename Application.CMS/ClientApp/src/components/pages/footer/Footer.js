import React from 'react';
import { useTranslation } from 'react-i18next';
import { version } from '../../../../package.json';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="main-footer">
            <strong>Copyright &copy; 2014-2019 <a href="http://adminlte.io">Nguyễn Đức Mạnh</a>.</strong>
    All rights reserved.
            <div className="float-right d-none d-sm-inline-block">
                <b>Address</b> 3.0.5
    </div>
        </footer>
    );
};

export default Footer;
