import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../hooks/globalContext';

const DEPLETED = 'DEPLETED';
const FIVE_MINUTES = 5 * 60 * 1000;

function updateNemiForestAction(location) {
    return {
        type: 'UPDATE_NEMI_FOREST',
        location
    };
}

export default function NemiForest({ setTitle }) {
    const [abortController] = useState(new AbortController());
    const [globalContext, dispatch] = useGlobalContext();
    const { nemiForest: { lastUpdated, location } } = globalContext;

    function refreshLocation() {
        fetch(`${process.env.API_HOST}/api/v1/nemi-forest`, { signal: abortController.signal })
            .then(res => {
                if (res.status === 404) {
                    return setLocation(DEPLETED);
                }

                return res.json().then(location => {
                    setTitle(`World ${location.world}`);
                    dispatch(updateNemiForestAction(location));
                });
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    console.error(err);
                }
            });
    }

    useEffect(() => {
        const elapsedTime = lastUpdated ? Date.now() - lastUpdated : Number.MAX_VALUE;
        if (elapsedTime > FIVE_MINUTES) {
            refreshLocation();
        }

        const timeout = setTimeout(refreshLocation, FIVE_MINUTES);
        return () => {
            clearTimeout(timeout);
            abortController.abort();
        };
    }, [lastUpdated]);

    if (!location) {
        return <p>Loading location...</p>;
    } else if (location === DEPLETED) {
        return <p>There is currently not an active Nemi Forest location, RuneTools will periodically check for a new location.</p>
    }

    return <>
        <img src={location.mapUrl} alt={`World ${location.world} map`} />
        <p>Location posted by {location.author} on <a href="https://reddit.com/r/nemiforest">/r/nemiforest</a></p>
    </>;
}
