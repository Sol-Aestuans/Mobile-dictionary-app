import { Fragment } from 'react';
import { StyleSheet, Pressable} from 'react-native';
import { View, Text } from '../components/themed';
import { useThemeColors } from '../hooks/useThemeColors';
import { Themes } from '../context/Theme';
import { useCustomTheme } from '../hooks/useCustomTheme';
import Header from '../components/Header';
import Main from '../layouts/Main';

const Border = () => {
  const { colors } = useThemeColors();
  return <View style={[styles.border, { backgroundColor: colors.divider}]} />;
};

const ThemeRow = ({ children, checked, onPress }) => {
  const { colors } = useThemeColors();

  const checkedStyle = [styles.checkbox, { borderColor: colors.highContrast }];

  if (checked) {
    checkedStyle.push({
      borderColor: colors.divider,
      backgroundColor: colors.highContrast,
    });
  }

  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={checkedStyle} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const ThemeScreen = () => {
  const { theme, setTheme } = useCustomTheme();

  return (
    <Main>
      <View style={{flex:1}} testID="testView">
        <Header/>
        <View style={{ padding: 20 }} keyboardShouldPersistTaps='handled'>
          {Themes.map((key, index) => (
            <Fragment key={key}>
              <ThemeRow onPress={() => setTheme(key)} checked={theme === key}>
                {key}
              </ThemeRow>
              {index !== Themes.length - 1 && <Border />}
            </Fragment>
          ))}
        </View>
      </View>
    </Main>
  );
};

const styles = StyleSheet.create({
  border: {
    height: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
});

export default ThemeScreen;