import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../slices/appSlice';
import { themes } from '../utils/theme';

/**
 * A hook returning theme and toggle function
 * for updating / toggling theme state in store
 */

const useTheme = () => {
    const dispatch = useDispatch();

    const theme = useSelector((state) => state.app?.theme);

    const toggleTheme = useCallback(() => {
        if (!theme) return;
        dispatch(setTheme({ theme: theme.$mode === 'dark' ? themes.light : themes.dark }));
    }, [dispatch, theme]);

    return { theme, toggleTheme };
};

export default useTheme;
