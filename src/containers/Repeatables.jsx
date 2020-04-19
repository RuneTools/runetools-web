import React, { useEffect, useState } from 'react';
import NemiForest from '../components/repeatables/NemiForest.jsx';
import Simple from '../components/repeatables/Simple.jsx';
import { useRepeatableSetting } from '../hooks/settings';
import { dateToUtc, isSameDayUtc, isSameMonthUtc, isSameResetWeek, truncateDateUtc } from '../util/date';
import { sendNotification } from '../util/notification';
import { REPEATABLE_DAILY, REPEATABLE_MONTHLY, REPEATABLE_WEEKLY } from '../util/repeatables';
import './Repeatables.scss';
import WikiLink from '../components/util/WikiLink.jsx';

const REPEATABLES = [
    {
        id: 'agoroth',
        name: 'Agoroth',
        type: REPEATABLE_WEEKLY,
        component: Simple,
        props: {
            content: (
                <p>Kill Agoroth twice to receive bonus experience pearls. Get there quickly using a games necklace.</p>
            )
        }
    },
    {
        id: 'bacon',
        name: 'Bacon',
        type: REPEATABLE_WEEKLY,
        component: Simple,
        props: {
            content: (
                <p>Claim bacon or pig familiar pouches from Eli Bacon in his basement at the Falador farm.</p>
            )
        }
    },
    {
        id: 'bird-meat',
        name: 'Bird Meat',
        type: REPEATABLE_DAILY,
        component: Simple,
        props: {
            content: (
                <p>Buy 6 packs of raw bird meat in Oo'glog.</p>
            )
        }
    },
    {
        id: 'broad-arrowheads',
        name: 'Broad Arrowheads',
        type: REPEATABLE_DAILY,
        component: Simple,
        props: {
            content: (
                <p>Buy 3000 broad arrowheads each from Turael/Spria at the Burthorpe lodestone, the Bandit Camp north of Edgeville, and any other slayer master for a total of 9000 broad arrowheads.</p>
            )
        }
    },
    {
        id: 'circus',
        name: 'Balthazar Beauregard\'s Big Top Bonanza',
        type: REPEATABLE_WEEKLY,
        component: Simple,
        props: {
            content: (
                <p>See the <WikiLink page="Balthazar Beauregard's Big Top Bonanza">wiki</WikiLink> for the weeks' location.</p>
            )
        }
    },
    {
        id: 'corrupted-scarabs',
        name: 'Corrupted Scarabs',
        type: REPEATABLE_DAILY,
        component: Simple,
        props: {
            content: (
                <p>Crush scarabs around the Shifting Tombs entrances throughout Menaphos for slayer experience and gold. Join the <strong>soulobby</strong> friends chat for callouts. Experience decreases with number squished and resets daily.</p>
            )
        }
    },
    {
        id: 'crystal-sandstone',
        name: 'Crystal-Flecked Sandstone',
        type: REPEATABLE_DAILY,
        component: Simple,
        props: {
            content: (
                <p>Mine 50 sandstone from Prifddinas' Ithell district, and if you have 115 dungeoneering, 25 sandstone in the Edimmu resource dungeon.</p>
            )
        }
    },
    {
        id: 'familiarisation',
        name: 'Familiarisation',
        type: REPEATABLE_WEEKLY,
        component: Simple,
        props: {
            content: (
                <p>Complete the familiarisation minigame. See the <WikiLink page="Familiarisation">wiki</WikiLink> for information on locating the currently active obelisk.</p>
            )
        }
    },
    {
        id: 'giant-oyster',
        name: 'Giant Oyster',
        type: REPEATABLE_MONTHLY,
        component: Simple,
        props: {
            content: (
                <p>Feed the giant oyster for farming and fishing experience and open the oyster the next month for random clue rewards.</p>
            )
        }
    },
    {
        id: 'god-statues',
        name: 'God Statues',
        type: REPEATABLE_MONTHLY,
        component: Simple,
        props: {
            content: (
                <p>Build all of the god statues for construction and prayer/slayer experience. See <WikiLink page="God Statues" section="Locations">this wiki</WikiLink> for locations.</p>
            )
        }
    },
    // TODO: A better widget can be made to say if the next cache will give the buff or not.
    {
        id: 'guthix-cache',
        name: 'Guthix Cache',
        type: REPEATABLE_DAILY,
        component: Simple,
        props: {
            content: (
                <p>Enter the Guthix Cache at the top of the hour and earn up to 200 points (100 per game max) per day for divination experience, and during select hours, a 10% chance to convert all memories in your inventory.</p>
            )
        }
    },
    {
        id: 'hanky-points',
        name: 'Hanky Points',
        type: REPEATABLE_WEEKLY,
        component: Simple,
        props: {
            content: (
                <p>Collect and hand in hanky points collected in the Lumbridge Thieves' Guild.</p>
            )
        }
    },
    {
        id: 'herby-werby',
        name: 'Herby Werby',
        type: REPEATABLE_WEEKLY,
        component: Simple,
        props: {
            content: (
                <p>Complete the Herby Werby minigame on Anachronia. A simple way to the location is to take the northern agility path and head toward the entrance after crossing the spine and the ruins following them.</p>
            )
        }
    },
    {
        id: 'jack-of-trades',
        name: 'Jack of Trades',
        type: REPEATABLE_DAILY,
        component: Simple,
        props: {
            content: (
                <p>Use your Jack of Trades aura to gain experience. See <WikiLink page="Jack of trades aura/Routines">this wiki</WikiLink> for strategies.</p>
            )
        }
    },
    {
        id: 'nemi-forest',
        name: 'Nemi Forest',
        type: REPEATABLE_DAILY,
        component: NemiForest
    },
    // TODO: A better widget can probably be made to show the locations of the penguins on world 60.
    {
        id: 'penguins',
        name: 'Penguin Hide and Seek',
        type: REPEATABLE_WEEKLY,
        component: Simple,
        props: {
            content: (
                <p>Find all of the disgused penguins. Use <a href="http://jq.world60pengs.com" rel="noopener noreferrer" target="_blank">this site</a> to help track your progress on world 60.</p>
            )
        }
    },
    {
        id: 'premiere-vault',
        name: 'Premiere Club Vault',
        type: REPEATABLE_MONTHLY,
        component: Simple,
        props: {
            content: (
                <p>Visit the Premiere Club Vault near the Grand Exchange in Varrock for random rewards found within treasure chests in the Vault.</p>
            )
        }
    },
    {
        id: 'reaper-task',
        name: 'Reaper Task',
        type: REPEATABLE_DAILY,
        component: Simple,
        props: {
            content: (
                <p>Complete your daily reaper task from Death north of the Draynor lodestone.</p>
            )
        }
    },
    {
        id: 'red-sandstone',
        name: 'Red Sandstone',
        type: REPEATABLE_DAILY,
        component: Simple,
        props: {
            content: (
                <p>Mine 50 sandstone from Oo'glog, and if you have the elite desert tasks complete, 25 sandstone east of Sophanem.</p>
            )
        }
    },
    {
        id: 'skeletal-horror',
        name: 'Skeletal Horror',
        type: REPEATABLE_WEEKLY,
        component: Simple,
        props: {
            content: (
                <p>Kill the skeletal horror near the rag and bone man for slayer and prayer experience. An invitation box can be used to teleport nearby.</p>
            )
        }
    },
    {
        id: 'solomons-store',
        name: 'Solomon\'s Store',
        type: REPEATABLE_MONTHLY,
        component: Simple,
        props: {
            content: (
                <p>Claim your free reward from Solomon's Store.</p>
            )
        }
    },
    {
        id: 'soul-obelisk',
        name: 'Soul Obelisk',
        type: REPEATABLE_DAILY,
        component: Simple,
        props: {
            content: (
                <p>Gain 20,000 reputation with a Menaphos faction, join the <strong>soulobby</strong> friends chat for location callouts.</p>
            )
        }
    },
    {
        id: 'strange-rocks',
        name: 'Strange Rocks',
        type: REPEATABLE_WEEKLY,
        component: Simple,
        props: {
            content: (
                <p>Complete the statue in the Varrock museum using strange rocks discovered while skilling.</p>
            )
        }
    },
    {
        id: 'tears-of-guthix',
        name: 'Tears of Guthix',
        type: REPEATABLE_WEEKLY,
        component: Simple,
        props: {
            content: (
                <p>Complete the Tears of Guthix minigame to gain experience in your lowest skill (by experience, not level). Get there quickly using a games necklace.</p>
            )
        }
    },
    {
        id: 'troll-invasion',
        name: 'Troll Invasion',
        type: REPEATABLE_MONTHLY,
        component: Simple,
        props: {
            content: (
                <p>Repel the trolls north of the Burthorpe lodestone  for an experience tome.</p>
            )
        }
    },
    {
        id: 'vis-wax',
        name: 'Vis Wax',
        type: REPEATABLE_DAILY,
        component: Simple,
        props: {
            content: (
                <p>Operate the Rune Goldberg Machine in the Runecrafting Guild. See <a href="https://secure.runescape.com/m=forum/sl=0/forums?75,76,331,66006366" rel="noopener noreferrer" target="_blank">this thread</a> or the <strong>vis wax fc</strong> for solutions.</p>
            )
        }
    }
];

const SECTIONS = [
    ['Dailies', REPEATABLE_DAILY],
    ['Weeklies', REPEATABLE_WEEKLY],
    ['Monthlies', REPEATABLE_MONTHLY],
];

function findRepeatableById(id) {
    return REPEATABLES.find(it => it.id === id);
}

function Repeatable({ completed, repeatable, setComplete }) {
    const { component: Component, id, name, props } = repeatable;
    const [title, setTitle] = useState(repeatable.name);

    const icon = completed
        ? <i className="las la-check"></i>
        : <i className="las la-times"></i>

    return (
        <div className={`block block-repeatable ${completed ? 'complete' : 'incomplete'}`}>
            <h3 onClick={() => setComplete(id, !completed)}>
                {icon} {title}
            </h3>
            {!completed && <Component
                {...props}
                setTitle={title => setTitle(`${name} - ${title}`)}
            />}
        </div>
    );
}

function RepeatableSection({ completed, setComplete, title, type }) {
    const [expanded, setExpanded] = useState(true);

    const icon = expanded
        ? <i className="las la-minus"></i>
        : <i className="las la-plus"></i>

    return <>
        <section className="repeatable-section">
            <h2 onClick={() => setExpanded(!expanded)}>{icon} {title}</h2>

            {expanded && REPEATABLES.filter(it => it.type === type).map(it =>
                <Repeatable
                    completed={completed.indexOf(it.id) !== -1}
                    key={it.id}
                    repeatable={it}
                    setComplete={setComplete}
                />
            )}
        </section>
    </>;
}

export default function Repeatables() {
    const [timeTillReset, setTimeTillReset] = useState();
    const [setting, setSetting] = useRepeatableSetting();
    const { completed, notifications } = setting;

    function notify(types) {
        types = types.filter(it => notifications.indexOf(it) !== -1)
            .map(it => SECTIONS.find(s => s[1] === it)[0]);

        let message;
        if (types.length === 1) {
            message = `${types[0]}`;
        } else if (types.length === 2) {
            message = `${types[0]} and ${types[1].toLowerCase()}`;
        } else if (types.length === 3) {
            message = `${types[0]}, ${types[1].toLowerCase()}, and ${types[2].toLowerCase()}`;
        }

        if (message) {
            sendNotification('RuneTools: Repeatables', { body: `${message} have been reset!` });
        }
    }

    function refreshCompleted() {
        const now = dateToUtc(new Date());

        if (setting.updated) {
            const typesToPurge = [];
            const updated = dateToUtc(new Date(setting.updated));

            if (!isSameDayUtc(updated, now))
                typesToPurge.push(REPEATABLE_DAILY);
            if (!isSameResetWeek(updated, now))
                typesToPurge.push(REPEATABLE_WEEKLY);
            if (!isSameMonthUtc(updated, now))
                typesToPurge.push(REPEATABLE_MONTHLY);

            setSetting({
                ...setting,
                completed: completed.filter(it => {
                    const repeatable = findRepeatableById(it);
                    return repeatable && typesToPurge.indexOf(repeatable.type) === -1;
                }),
                updated: new Date().toUTCString()
            });

            notify(typesToPurge);
        }

        let nextReset = truncateDateUtc(now);
        nextReset.setUTCDate(nextReset.getUTCDate() + 1);
        setTimeTillReset(nextReset.getTime() - now.getTime());
    }

    function setComplete(id, complete) {
        setSetting({
            ...setting,
            completed: complete
                ? completed.concat(id)
                : completed.filter(it => it !== id),
            updated: new Date().toUTCString()
        });
    }

    useEffect(() => {
        if (timeTillReset) {
            const timeout = setTimeout(refreshCompleted, timeTillReset);
            return () => clearTimeout(timeout);
        }
        refreshCompleted();
    }, [timeTillReset]);

    return SECTIONS.map(([title, type], key) =>
        <RepeatableSection
            key={key}
            completed={completed}
            setComplete={setComplete}
            title={title}
            type={type}
        />
    );
}
