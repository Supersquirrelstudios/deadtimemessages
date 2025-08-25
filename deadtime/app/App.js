import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingScreen from './src/screens/OnboardingScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import RecordMessageScreen from './src/screens/RecordMessageScreen';
import RecipientsScreen from './src/screens/RecipientsScreen';
import TriggerSettingsScreen from './src/screens/TriggerSettingsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="RecordMessage" component={RecordMessageScreen} />
        <Stack.Screen name="Recipients" component={RecipientsScreen} />
        <Stack.Screen
          name="TriggerSettings"
          component={TriggerSettingsScreen}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}