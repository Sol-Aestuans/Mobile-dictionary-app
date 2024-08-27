import { Text as DefaultText } from 'react-native';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useMyFonts } from '../../hooks/useMyFonts';

const Text = ({ style, ...rest }) => {
  const { colors } = useThemeColors();
  const { fonts } = useMyFonts();

  return (
    <DefaultText
      style={[
        { color: colors.text, fontFamily: fonts.regular, fontSize: 16 },
        style,
      ]}
      {...rest}
    />
  );
};

const TextBold = ({ style, ...rest }) => {
  const { colors } = useThemeColors();
  const { fonts } = useMyFonts();

  return (
    <DefaultText
      style={[
        { color: colors.text, fontFamily: fonts.bold, fontSize: 16},
        style,
      ]}
      {...rest}
    />
  );
};


const TextContrast = ({ style, ...rest }) => {
  const { colors } = useThemeColors();
  const { fonts } = useMyFonts();

  return (
    <DefaultText
      style={[
        { color: colors.highContrast, fontFamily: fonts.regular, fontSize: 16, },
        style,
      ]}
      {...rest}
    />
  );
};

const TextAlt = ({ style, ...rest }) => {
  const { colors } = useThemeColors();
  const { fonts } = useMyFonts();

  return (
    <DefaultText
      style={[
        { color: colors.altText, fontFamily: fonts.regular, fontSize: 16 },
        style,
      ]}
      {...rest}
    />
  );
};

const TextBoldContrast = ({ style, ...rest }) => {
  const { colors } = useThemeColors();
  const { fonts } = useMyFonts();

  return (
    <DefaultText
      style={[
        { color: colors.text, fontFamily: fonts.italics, fontSize: 16},
        style,
      ]}
      {...rest}
    />
  );
};
export { Text, TextBold, TextContrast, TextAlt, TextBoldContrast };
export default Text;