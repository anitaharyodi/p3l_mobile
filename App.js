import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './services/router';
import {Main} from './screens';
import { LoginProvider } from './Context/HotelContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <LoginProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Routes" component={Routes} />
        </Stack.Navigator>

        </LoginProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
