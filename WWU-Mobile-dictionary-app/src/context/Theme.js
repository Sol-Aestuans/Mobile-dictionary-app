import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';

const Themes = ['light', 'dark'];

const ThemeContext = createContext({
    theme: 'light',
    setTheme: () => {},
    colors: Colors['light'],
    loading: true,
});

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [loading, setLoading] = useState(true);
    const colors = Colors[theme];

    // on startup sets the users last set theme
    useEffect(() => {
        AsyncStorage.getItem('@user_preffered_theme').then((storedTheme) => {
            if (storedTheme) {
                setTheme(storedTheme);
            }
        }).finally(() => setLoading(false));
    }, []);

    // updates the preferred theme when a user selects a theme
    useEffect(() => {
        AsyncStorage.setItem('@user_preffered_theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value = {{ theme, setTheme, colors, loading}}>
          { children }
        </ThemeContext.Provider>
    );
};

export {ThemeContext, ThemeProvider, Themes};