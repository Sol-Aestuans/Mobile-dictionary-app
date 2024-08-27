import Fonts from '../constants/Fonts';
import { useCustomFont } from './useCustomFont';

export const useMyFonts = () => {
    const customFont = useCustomFont();

    return {
      font: customFont.font,
      fonts: Fonts[customFont.font],
    };
  }