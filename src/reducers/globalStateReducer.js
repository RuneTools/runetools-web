export const globalStateReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_NEMI_FOREST':
            return {
                ...state,
                nemiForest: {
                    lastUpdated: Date.now(),
                    location: action.location
                }
            };
        case 'UPDATE_SETTING':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    [action.setting]: action.value
                }
            };
        case 'UPDATE_VOS':
            return {
                ...state,
                vos: {
                    ...action.vos
                }
            };
    }
};
