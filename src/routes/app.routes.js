import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import ChatRoom from '../pages/ChatRoom';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Messages from '../pages/Messages';

export default function AppRoutes() {
  return (
        <Stack.Navigator initialRouteName='ChatRoom'>
            <Stack.Screen name="Login" component={ Login } options={{ title: 'Faça login' }} />
            <Stack.Screen name="ChatRoom" component={ ChatRoom } options={{ headerShown: false }} />
            <Stack.Screen name="Messages" component={ Messages } options={({ route }) => ({ title: route.params?.thread.name })} />
            <Stack.Screen name="Search" component={ Search } options={{ title: 'Procurando algum grupo?' }} />
        </Stack.Navigator>
  )
}