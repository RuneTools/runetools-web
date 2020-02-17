import { useGlobalContext } from './globalContext';

export const initialSettingsContext = {};

function buildUseSetting(key, initialValue) {
    try {
        let value = JSON.parse(localStorage.getItem(key));
        initialSettingsContext[key] = value === null ? initialValue : value;
    } catch (err) {
        console.error(err);
        initialSettingsContext[key] = initialValue;
    }

    function updateSettingAction(value) {
        return {
            setting: key,
            type: 'UPDATE_SETTING',
            value
        };
    }

    return function useSetting() {
        const [globalContext, dispatch] = useGlobalContext();
        const { settings } = globalContext;

        function setValue(value) {
            try {
                const valueToStore = value instanceof Function ? value(settings[key]) : value;
                dispatch(updateSettingAction(valueToStore));
                localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (err) {
                console.error(err);
            }
        }

        return [settings[key], setValue];
    };
}

export const useRepeatableSetting = buildUseSetting('runetools.repeatable', {
    completed: [],
    notifications: []
});

export const useThemeSetting = buildUseSetting('runetools.theme', 'system');

export const useVosSetting = buildUseSetting('runetools.vos', []);
