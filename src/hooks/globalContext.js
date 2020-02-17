import { useContext } from 'react';
import { GlobalContext } from '../providers/globalProvider';

export function useGlobalContext() {
    return useContext(GlobalContext);
}
