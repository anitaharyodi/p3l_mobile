import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, {useEffect, useState} from "react";
import Homepage from "../Home";
import Rooms from "../Rooms";
import MyBooking from "../MyBooking";
import Profile from "../Profile";
import { Image, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import img from "../../assets/img";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Tab = createBottomTabNavigator();

function Main() {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#04325F",
        tabBarHideOnKeyboard:[true],
        tabBarInactiveTintColor: "#CED1D4",
        tabBarStyle: {
          position: "absolute",
          elevation: 0,
          backgroundColor: "#ffffff",
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let tabIcon = {
            Home: img.HOMEICON,
            Rooms : img.ROOMICON,
            History : img.HISTORYICON,
            Profile : img.PROFILEICON
          };

          return  <Image
          source={tabIcon[route.name]}
          style={{ width: size, height: size, tintColor: color }}
        />;
        },
        tabBarLabelStyle: {
          display: "none",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Homepage}
        options={() => ({
          tabBarLabelStyle: { display: "flex", fontWeight: "bold" },
        })}
      />
      <Tab.Screen
        name="Rooms"
        component={Rooms}
        options={() => ({
          tabBarLabelStyle: { display: "flex", fontWeight: "bold" },
        })}
      />
      <Tab.Screen
        name="History"
        component={MyBooking}
        options={() => ({
          tabBarLabelStyle: { display: "flex", fontWeight: "bold" },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={() => ({
          tabBarLabelStyle: { display: "flex", fontWeight: "bold" },
        })}
      />
    </Tab.Navigator>

  );
}

export default Main;
