import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, {useEffect, useState} from "react";
import { Image, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import img from "../../assets/img";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogin } from "../../Context/HotelContext";
import ReportStaff from "../ReportStaff";
import Report2Staff from "../Report2Staff";
import ProfileStaff from "../ProfileStaff";


const Tab = createBottomTabNavigator();

function MainStaff() {
  const {isLoginPegawai} = useLogin()

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
            Report1: img.REPORT1,
            Report2 : img.REPORT2,
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
          name="Report1"
          component={ReportStaff}
          options={() => ({
            tabBarLabelStyle: { display: "flex", fontWeight: "bold" },
            tabBarLabel: 'New Customer Report'
          })} />
          <Tab.Screen
            name="Report2"
            component={Report2Staff}
            options={() => ({
              tabBarLabelStyle: { display: "flex", fontWeight: "bold" },
              tabBarLabel: 'Customer Rank Report'
            })} />
          <Tab.Screen
            name="Profile"
            component={ProfileStaff}
            options={() => ({
              tabBarLabelStyle: { display: "flex", fontWeight: "bold" },
            })} />

    </Tab.Navigator>

  );
}

export default MainStaff;
