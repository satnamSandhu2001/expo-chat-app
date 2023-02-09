import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import Chat from '../screens/Chat';
import Login from '../screens/Login';
import { connectSocket, socket } from '../utils/socket';

const Stack = createStackNavigator();
const AppNavigator = () => {
  useEffect(() => {
    connectSocket();
    socket.on('connect', () => {
      console.log('socket connect');
    });
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Chat"
            component={Chat}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
