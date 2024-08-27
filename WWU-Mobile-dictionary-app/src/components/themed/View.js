import { View as DefaultView } from 'react-native';
import { SafeAreaView as DefaultSafeAreaView } from 'react-native-safe-area-context';
import { useCustomTheme } from '../../hooks/useCustomTheme';

export const ViewPlain = ({ ...rest }) => {
  return (<DefaultView {...rest} />);
};

export const View = ({ style, ...rest }) => {
  const { colors } = useCustomTheme();

  return (
    <DefaultView
      style={[{ backgroundColor: colors.background }, style]}
      {...rest}
    />
  );
};

export const SafeAreaView = ({ style, ...rest }) => {
  const { colors } = useCustomTheme();

  return (
    <DefaultSafeAreaView
      style={[{ backgroundColor: colors.background }, style]}
      {...rest}
    />
  );
};

export const SearchView = ({ style, ...rest }) => {
  const { colors } = useCustomTheme();

  return (
    <DefaultView
      style={[{ backgroundColor: colors.search }, style]}
      {...rest}
    />
  );
};