import * as React from 'react';
import {AppRegistry, PermissionsAndroid} from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import {name as appName} from './app.json';
import App from './App';
import Meteor from '@meteorrn/core';

import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import Geolocation from 'react-native-geolocation-service';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'red',
    secondary: 'blue',
  },
};

export default function Main() {
  return (
    <PaperProvider theme={null}>
      <App />
    </PaperProvider>
  );
}

ReactNativeForegroundService.register();
AppRegistry.registerComponent(appName, () => Main);

ReactNativeForegroundService.add_task(
  () => {
    !Meteor.status().connected && Meteor.reconnect();
    Meteor.userId() &&
      Meteor.subscribe(
        'user',
        {_id: Meteor.userId()},
        // {
        //   fields: {
        //     _id: 1,
        //     descuentovpn: 1,
        //     descuentoproxy: 1,
        //     profile: 1,
        //     megasGastadosinBytes: 1,
        //     baneado: 1,
        //   },
        // },
      );
    let user =
      Meteor.userId() &&
      Meteor.users.findOne(
        Meteor.userId(),
        // {
        //   fields: {
        //     _id: 1,
        //     profile: 1,
        //     megasGastadosinBytes: 1,
        //     baneado: 1,
        //     fechaSubscripcion: 1,
        //     megas: 1,
        //   },
        // }
      );
    !Meteor.status().connected &&
      ReactNativeForegroundService.update({
        id: 1000000,
        title: 'Bienvenido a VidKar',
        message: 'Usted se encuentra Offline, por favor conectese a internet!',
        visibility: 'private',
        // largeicon: 'home',
        vibration: false,
        // button: true,
        // buttonText: 'Abrir Vidkar',
        importance: 'none',
        // number: '10000',

        // icon: 'home',
      });

    Meteor.status().connected &&
      !user &&
      ReactNativeForegroundService.update({
        id: 1000000,
        title: 'Bienvenido a VidKar',
        message: 'Debe iniciar sesión!',
        visibility: 'private',
        // largeicon: 'home',
        vibration: false,
        button: true,
        buttonText: 'Abrir Vidkar',
        importance: 'none',
        // number: '10000',

        // icon: 'home',
      });

    Meteor.status().connected &&
      user &&
      ReactNativeForegroundService.update({
        id: 1000000,
        title:
          'Bienvenido: ' +
          (user.profile &&
            user.profile.firstName + ' ' + user.profile.lastName),

        visibility: 'private',
        // largeicon: 'home',
        vibration: false,
        button: true,
        buttonText: 'Abrir Vidkar',
        importance: 'none',
        // number: '10000',
        // icon: 'home',
      });

    Meteor.status().connected && user && actualizarUbicacion();
  },
  {
    delay: 10000,
    onLoop: true,
    taskId: 'meteorReconectAndConsumo',
    onError: e => console.log(`Error logging:`, e),

    // onSuccess: () =>
    //   ,
  },
);
ReactNativeForegroundService.start({
  id: 1000000,
  title: 'Servicio de VidKar',
  message: 'Debe iniciar sesión!',
  visibility: 'private',
  // largeicon: 'home',
  vibration: false,
  button: true,
  buttonText: 'Abrir Vidkar',
  importance: 'none',
  //   number: '10000',

  // icon: 'home',
});

const actualizarUbicacion = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'App needs access to your location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission granted');
      Geolocation.getCurrentPosition(
        posicion => {
          const coordenadas = posicion.coords;
          console.log(coordenadas);

          console.log('speed', coordenadas.speed);

          Meteor.users.update(Meteor.userId(), {
            $set: {
              cordenadas: {
                latitude: coordenadas.latitude,
                longitude: coordenadas.longitude,
              },
            },
          });
        },
        error => console.log(error.message),
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

// como puedo buscar en una coleccion de mongodb donde el elemento cadeteid sea distinto de nulo