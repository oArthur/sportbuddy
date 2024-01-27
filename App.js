import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


//components
import DropdownComponent from "./components/DropdownComponent";

//screens
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import HomeTabs from "./screens/HomeTabs";
import Preferences from "./screens/Preferences";
import Notifications from "./screens/Notifications";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName="Login"
          >
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
            />
            <Stack.Screen
                name="Preferences"
                component={Preferences}
            />
            <Stack.Screen
                name="HomeTabs"
                component={HomeTabs}
            />
              <Stack.Screen
                  name="Notifications"
                  component={Notifications}
              />

          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
