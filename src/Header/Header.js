import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';

import './Header.css';

export const Header = () => {

    return (
        <header className="page-header">
            <Link to="/" className="page-header__link" >Яндекс переговорки</Link>
            <Button classes="btn-text-blue" title="Создать встречу" />
        </header>
    )
}