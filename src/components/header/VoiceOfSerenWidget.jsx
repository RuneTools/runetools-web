import React, { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../../hooks/globalContext';
import { useVosSetting } from '../../hooks/settings';
import { sendNotification } from '../../util/notification';
import { readableClanName } from '../../util/vos';
import './VoiceOfSerenWidget.scss';

const FIFTEEN_SECONDS = 15 * 1000;
const ONE_HOUR = 60 * 60 * 1000;

function updateVosAction(vos) {
    return {
        type: 'UPDATE_VOS',
        vos
    };
}

export default function VoiceOfSerenWidget() {
    const poller = useRef();

    const [globalContext, dispatch] = useGlobalContext();
    const [ignoreFirst, setIgnoreFirst] = useState(true);
    const [setting] = useVosSetting();
    const [shouldPoll, setShouldPoll] = useState(true);

    const { vos: { clans } } = globalContext;

    function notifyWatchedClans() {
        let matches = setting.filter(clan => clans.indexOf(clan) !== -1)
            .map(readableClanName);

        if (matches.length) {
            sendNotification('RuneTools: Voice of Seren', {
                body: `${matches.join(' and ')} ${matches.length > 1 ? 'are' : 'is'} now active!`
            });
        }
    }

    function refreshClans() {
        fetch(`${process.env.API_HOST}/api/v1/voice-of-seren`)
            .then(res => res.json())
            .then(json => {
                let clansChanged = clans.every(clan => json.clans.indexOf(clan) === -1);
                if (clansChanged) {
                    dispatch(updateVosAction(json));
                    setShouldPoll(false);
                } else {
                    setShouldPoll(true);
                }
            })
            .catch(err => {
                console.error(err);
                setShouldPoll(true);
            });
    }

    useEffect(() => {
        if (shouldPoll) {
            if (!poller.current) {
                refreshClans();
            }

            poller.current = setInterval(refreshClans, FIFTEEN_SECONDS);
            return () => clearInterval(poller.current);
        } else {
            clearInterval(poller.current);
        }
    }, [shouldPoll]);

    useEffect(() => {
        let now = Date.now();
        let timeoutDuration = Math.ceil(now / ONE_HOUR) * ONE_HOUR - now;
        let timeout = setTimeout(refreshClans, timeoutDuration);

        if (clans.length && ignoreFirst) {
            setIgnoreFirst(false);
        } else {
            notifyWatchedClans();
        }

        return () => clearTimeout(timeout);
    }, [clans]);

    let emblems = clans.length && clans.map((clan, key) => {
        let clanName = readableClanName(clan);
        return <div className="header-widget-vos-clan" key={key}>
            <img src={`/images/clans/${clan}.png`} alt={`${clanName} emblem`} />
            {clanName}
        </div>
    });

    return (
        <div className="header-widget-vos">
            {emblems || 'Loading voices...'}
        </div>
    );
}
