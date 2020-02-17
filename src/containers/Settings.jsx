import React from 'react';
import { useRepeatableSetting, useThemeSetting, useVosSetting } from '../hooks/settings';
import { REPEATABLE_NOTIFICATIONS } from '../util/repeatables';
import { THEMES } from '../util/theme';
import { CLANS, readableClanName } from '../util/vos';
import './Settings.scss';

function requestNotifications() {
    if ('Notification' in window) {
        Notification.requestPermission();
    }
};

function RepeatableSettings() {
    const [repeatable, setRepeatable] = useRepeatableSetting();
    const { notifications } = repeatable;

    function onChange({ target: { checked, value } }) {
        const newNotifications = checked
            ? notifications.concat(value)
            : notifications.filter(it => it !== value);

        setRepeatable({
            ...repeatable,
            notifications: newNotifications
        });

        if (checked) {
            requestNotifications();
        }
    }

    return (
        <div className="block block-settings">
            <h3>Reset Notifications</h3>
            {REPEATABLE_NOTIFICATIONS.map((props, key) => (
                <label key={key}>
                    <input
                        checked={notifications.indexOf(props.value) !== -1}
                        onChange={onChange}
                        type="checkbox"
                        value={props.value}
                    />
                    {props.name}
                </label>
            ))}
        </div>
    )
}

function ThemeSettings() {
    const [theme, setTheme] = useThemeSetting();

    function onChange({ target: { value } }) {
        setTheme(value);
    }

    return (
        <div className="block block-settings">
            <h3>Theme</h3>
            {THEMES.map((props, key) => (
                <label key={key}>
                    <input
                        checked={theme === props.value}
                        name="theme"
                        onChange={onChange}
                        type="radio"
                        value={props.value}
                    />
                    {props.name}
                </label>
            ))}
        </div>
    )
}

function VosSettings() {
    const [vos, setVos] = useVosSetting();

    function onChange({ target: { checked, value } }) {
        const newVos = checked
            ? vos.concat(value)
            : vos.filter(it => it !== value);

        setVos(newVos);

        if (checked) {
            requestNotifications();
        }
    }

    return (
        <div className="block block-settings">
            <h3>Voice of Seren Notifications</h3>
            <p>Enable desktop notifications for the following voices:</p>
            {CLANS.map((clan, key) => (
                <label key={key}>
                    <input
                        checked={vos.indexOf(clan) !== -1}
                        type="checkbox"
                        onChange={onChange}
                        value={clan}
                    />
                    {readableClanName(clan)}
                </label>
            ))}
        </div>
    );
}

export default function Settings() {
    return <>
        <ThemeSettings />
        <VosSettings />
        <RepeatableSettings />
    </>;
}
