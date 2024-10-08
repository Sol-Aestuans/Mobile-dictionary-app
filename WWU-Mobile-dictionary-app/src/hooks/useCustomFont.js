import { useContext } from 'react';
import { FontContext } from '../context/Font';

export const useCustomFont = () => {
    const context = useContext(FontContext);

    return {
        font: context.font,
        setFont: context.setFont,
        fonts: context.fonts,
        loading: context.loading,
    }
}