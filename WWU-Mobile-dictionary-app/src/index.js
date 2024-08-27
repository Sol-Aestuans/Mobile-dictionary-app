import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './navigation/RootNavigation';
import { ThemeProvider } from './context/Theme';
import { FontProvider } from './context/Font';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <FontProvider>
          <RootNavigation />
        </FontProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;