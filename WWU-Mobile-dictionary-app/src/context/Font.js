import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fonts from '../constants/Fonts';

const Fontfamilies = ['sans_serif', 'sans', 'mono'];

const FontContext = createContext({
    font: 'mono',
    setFont: () => {},
    fonts: Fonts['mono'],
    loading: true,
});

const FontProvider = ({ children }) => {
    const [font, setFont] = useState('mono');
    const [loading, setLoading] = useState(true);
    const fonts = Fonts[font];

    // on startup sets the users last set font
    useEffect(() => {
        AsyncStorage.getItem('@user_preffered_font').then((storedFont) => {
            if (storedFont) {
                setFont(storedFont);
            }
        }).finally(() => setLoading(false));
    }, []);

    // updates the preferred font when a user selects a font
    useEffect(() => {
        AsyncStorage.setItem('@user_preffered_font', font);
    }, [font]);

    return (
        <FontContext.Provider value = {{ font, setFont, fonts, loading}}>
          { children }
        </FontContext.Provider>
    );
};

export {FontContext, FontProvider, Fontfamilies};