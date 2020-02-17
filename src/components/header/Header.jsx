import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import VoiceOfSerenWidget from './VoiceOfSerenWidget.jsx';

export default function Header() {
    return (
        <header>
            <h1><Link to="/">RuneTools</Link></h1>
            <VoiceOfSerenWidget />
        </header>
    );
}
