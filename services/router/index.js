import { View, Text, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screens/Login';
import Register from '../../screens/Register';
import Main from '../../screens/Main';
import img from '../../assets/img';
import RoomDetail from '../../screens/Rooms/utils/RoomDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../Context/HotelContext';
import EditPage from '../../screens/Profile/utils/EditPage';
import ChangePassword from '../../screens/Profile/utils/ChangePassword';
import DetailHistory from '../../screens/MyBooking/utils/DetailHistory';
import ForgotPassword from '../../screens/ForgotPassword';
import LoginStaff from '../../screens/LoginStaff';
import ForgotPasswordStaff from '../../screens/ForgotPasswordStaff';
import ReportStaff from '../../screens/ReportStaff';
import SearchBookRoom from '../../screens/SearchBookRoom';
import MainStaff from '../../screens/MainStaff';
import Report2Staff from '../../screens/Report2Staff';

const Stack = createStackNavigator();

const Routes = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { isLogin, setIsLogin, setIsToken } = useLogin();

  useEffect(() => {
    setIsLogin(false);
    async function checkToken() {
      const token = await AsyncStorage.getItem('token');
      setShowSplash(false);

      if (token) {
        setIsLogin(true);
      }
    }

    setTimeout(() => {
      checkToken();
      setIsLogin(false);
    }, 3000);
  }, [setIsLogin, setIsToken]);

  return (
    <Stack.Navigator
      initialRouteName={showSplash ? 'Splash' : 'Main'}
      screenOptions={{
        headerShown: false,
      }}
      screenListeners={{
        state: (nav) => {
          console.log("NAVIGATIONNN");
          console.log(JSON.stringify(nav, null, 2));
          console.log("NAVIGATIONNN");
        }
      }}
    >
      {showSplash ? (
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />
      ) : null}
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RoomDetail" component={RoomDetail} />
      <Stack.Screen name="EditProfile" component={EditPage} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="DetailHistory" component={DetailHistory} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="SearchBookRoom" component={SearchBookRoom} />

      {/* Staff */}
      <Stack.Screen name="MainStaff" component={MainStaff} />
      <Stack.Screen name="LoginStaff" component={LoginStaff} />
      <Stack.Screen name="ForgotPasswordStaff" component={ForgotPasswordStaff} />
    </Stack.Navigator>
  );

};

const SplashScreen = () => (
  <View style={styles.splashContainer}>
    <Image
      source={img.LOGOBAWAH}
      style={styles.splashImage}
    />
  </View> 
);

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E2131'
  },
  splashImage: {
    width: 300, 
    height: 130, 
  },
});

export default Routes;