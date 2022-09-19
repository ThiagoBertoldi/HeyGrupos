import React from "react";
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import ChatRoom from './src/pages/ChatRoom';
import Login from './src/pages/Login';

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='ChatRoom' component={ChatRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}