import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../hooks/useThemeColors';
import HomeScreen from '../screens/HomeScreen';
import ThemeScreen from '../screens/ThemeScreen';
import FontScreen from '../screens/FontScreen';
import { useMyFonts } from '../hooks/useMyFonts';

const TabBarIcon = ({ color, size, name }) => (
  <Ionicons name={name} size={size} color={color} />
);

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const { colors } = useThemeColors();
  const {fonts} = useMyFonts();

  return (
    <Tab.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        tabBarInactiveTintColor: colors.altText,
        tabBarActiveTintColor: colors.searchBorderActive,
        tabBarLabelStyle: {fontFamily: fonts.regular},
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: (props) => (
            <TabBarIcon name='home' {...props} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Theme'
        component={ThemeScreen}
        options={{
          title: 'Theme',
          tabBarIcon: (props) => (
            <TabBarIcon name='moon' {...props} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Font'
        component={FontScreen}
        options={{
          title: 'Font',
          tabBarIcon: (props) => (
            <TabBarIcon name='list' {...props} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;