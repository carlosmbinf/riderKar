/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import {StyleSheet, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import UserList from './imports/ui/Users/UsersList';
import CreateUserScreen from './imports/ui/Users/CreateUserScreen';
import UserDetailScreen from './imports/ui/Users/UserDetailScreen';
import PruebaAuth from './imports/ui/Users/PruebaAuth';
import Ubicacion from './imports/ui/Maps/Ubicacion';

import Meteor from '@meteorrn/core';
// Meteor.connect('ws://192.168.1.26:3000/websocket');

import Loguin from './imports/ui/Login/Loguin';
import HomePedidos from './imports/ui/Pedidos/HomePedidos';
import CustomNavigationBar from './imports/ui/Header/Header';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <CustomNavigationBar {...props} />,
        headerShown: true,
      }}>
      <Stack.Screen name="Login" component={Loguin} />
      <Stack.Screen name="Pedidos" component={HomePedidos} />

      <Stack.Screen name="Ubicacion" component={Ubicacion} />

      <Stack.Screen name="PruebaAuth" component={PruebaAuth} />

      <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} />
      <Stack.Screen name="UserList" component={UserList} />
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
    </Stack.Navigator>
  );
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
// muestrame un ejemplo de useEfect de React
