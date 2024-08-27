import { Fragment } from 'react';
import { StyleSheet, Pressable} from 'react-native';
import { View, Text } from '../components/themed';
import { useThemeColors } from '../hooks/useThemeColors';
import { Fontfamilies } from '../context/Font';
import { useCustomFont } from '../hooks/useCustomFont';
import Fonts from '../constants/Fonts';
import Main from '../layouts/Main';
import Header from '../components/Header';

const Border = () => {
  const { colors } = useThemeColors();
  return <View style={[styles.border, { backgroundColor: colors.divider}]} />;
};

const FontRow = ({ children, checked, onPress, fontName }) => {
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
      <Text style={[styles.text, {fontFamily: Fonts[fontName].regular}]}>{children}</Text>
    </Pressable>
  );
};

const FontScreen = () => {
  const {font, setFont} = useCustomFont();

  return (
    <Main>
      <View style={{flex:1}}>
        <Header/>
        <View style={{ padding: 20 }} keyboardShouldPersistTaps='handled'>
          {Fontfamilies.map((key, index) => (
            <Fragment key={key}>
              <FontRow onPress={() => setFont(key)} checked={font === key} fontName={key}>
                {key}
              </FontRow>
              {index !== Fontfamilies.length - 1 && <Border />}
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

export default FontScreen;