import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

export default function Navbar() {
    return (
        <nav>
            <NavLink exact to="/"><i className="las la-home"></i> Home</NavLink>
            <NavLink to="/settings"><i className="las la-cog"></i> Settings</NavLink>
        </nav>
    );
}
