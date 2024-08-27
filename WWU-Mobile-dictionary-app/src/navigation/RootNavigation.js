import { useEffect } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import BottomTabs from './BottomTabs';
import { useThemeColors } from '../hooks/useThemeColors';
import { useCustomTheme } from '../hooks/useCustomTheme';
import {useFonts} from 'expo-font';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootNavigation = () => {
  const { colors } = useThemeColors();
  const { theme } = useCustomTheme();

  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../../assets/fonts/inter/static/Inter-Regular.ttf'),
    'Inter-Bold': require('../../assets/fonts/inter/static/Inter-Bold.ttf'),
    'Lora-Regular': require('../../assets/fonts/lora/static/Lora-Regular.ttf'),
    'Lora-Bold': require('../../assets/fonts/lora/static/Lora-Bold.ttf'),
    'Lora-BoldItalic': require('../../assets/fonts/lora/static/Lora-BoldItalic.ttf'),
    'Inconsolata-Regular': require('../../assets/fonts/inconsolata/static/Inconsolata-Regular.ttf'),
    'Inconsolata-Bold': require('../../assets/fonts/inconsolata/static/Inconsolata-Bold.ttf'),
  });

  const navigationTheme = {
    colors: {
      card: colors.background,
      text: colors.text,
      border: 'transparent',
    },
  };

  // wait for the theme to load before hiding the splash screen
  
  useEffect(() => {
    const fetchSetting = async () => {
      if (!theme.loading && fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    fetchSetting();
  }, [theme.loading, fontsLoaded]);

  if (theme.loading) return null;
  if (!fontsLoaded) return null;
  
  return (
    <NavigationContainer theme={navigationTheme}>
        <BottomTabs />
    </NavigationContainer>
  );
};

export default RootNavigation;