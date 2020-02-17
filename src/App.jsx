import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './components/header/Header.jsx';
import Navbar from './components/header/Navbar.jsx';
import Repeatables from './containers/Repeatables.jsx';
import Settings from './containers/Settings.jsx';
import { useThemeSetting } from './hooks/settings';
import { DARK_THEME, LIGHT_THEME, SYSTEM_DEFAULT_THEME } from './util/theme';

export default function App() {
    const [theme] = useThemeSetting();
    const [systemTheme, setSystemTheme] = useState(DARK_THEME);

    function mediaListener(event) {
        setSystemTheme(event.matches ? LIGHT_THEME : DARK_THEME);
    }

    useEffect(() => {
        if ('matchMedia' in window) {
            let result = window.matchMedia('(prefers-color-scheme: light)');
            result.addListener(mediaListener);
            return () => result.removeListener(mediaListener);
        }
    }, []);

    useEffect(() => {
        document.body.className = theme === SYSTEM_DEFAULT_THEME ? systemTheme : theme;
    }, [theme, systemTheme]);

    return (
        <Router>
            <Header />
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Repeatables />
                </Route>
                <Route path="/settings">
                    <Settings />
                </Route>
            </Switch>
        </Router>
    );
}
