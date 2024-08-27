import { TextInput as DefaultTextInput } from 'react-native';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useMyFonts } from '../../hooks/useMyFonts';

const TextInput = ({ style, ...rest }) => {
    const { colors } = useThemeColors();
    const { fonts } = useMyFonts();

    return (
        <DefaultTextInput
            style={[
                { color: colors.text, fontFamily: fonts.regular},
                style,
            ]}
            {...rest}
        />
    );
};

export default TextInput;