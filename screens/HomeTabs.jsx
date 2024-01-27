import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import Home from "./Home";
import Store from "./Store";
import Explore from "./Explore";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Preferences from "./Preferences";
import Friends from "./Friends";
import Chat from "./Chat";


export default function HomeTabs() {
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#402c77",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Store"
          component={Store}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="store" size={size} color={color} />
            ),
          }}
        />

          <Tab.Screen
          name="Friends"
          component={Friends}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="group" size={size} color={color} />
            ),
            unmountOnBlur: true,
          }}
        />
          <Tab.Screen
              name="Chat"
              component={Chat}
              options={{
                  tabBarIcon: ({ color, size }) => (
                      <MaterialIcons name="chat" size={size} color={color} />
                  ),
              }}
          />
          {/*<Tab.Screen*/}
          {/*    name="Notifications"*/}
          {/*    component={Notifications}*/}
          {/*    options={{*/}
          {/*        tabBarIcon: ({ color, size }) => (*/}
          {/*            <MaterialIcons name="notifications" size={size} color={color} />*/}
          {/*        ),*/}
          {/*        unmountOnBlur: true,*/}
          {/*        headerShown: false,*/}
          {/*    }}*/}
          {/*/>*/}
        <Tab.Screen
          name="Profile"
          component={Preferences}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
});
