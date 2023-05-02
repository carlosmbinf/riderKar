import React, {Component, useEffect} from 'react';
import {
  Alert,
  View,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Dimensions,
} from 'react-native';
import Meteor, {Accounts, Mongo, withTracker} from '@meteorrn/core';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button, IconButton, Surface, Text, TextInput} from 'react-native-paper';

const {width: screenWidth} = Dimensions.get('window');
const {height: screenHeight} = Dimensions.get('window');
// import {Mensajes} from '../collections/collections'

import Video from 'react-native-video';
// import Orientation from 'react-native-orientation';
// import HeroBot from '../animations/HeroBot';

class Loguin extends Component {
  componentDidMount() {
    // Orientation.lockToPortrait();
    // Orientation.unlockAllOrientations();
  }

  componentWillUnmount() {
    // Orientation.unlockAllOrientations();
    // Orientation.lockToPortrait();
  }
  componentDidUpdate() {
    Meteor.user() && this.props.navigation.navigate('Pedidos');
    // Orientation.unlockAllOrientations();
    // Orientation.lockToPortrait();
  }

  constructor(props) {
    super(props);
    const {navigation} = this.props;
    Meteor.connect('ws://192.168.1.26:3000/websocket');

    // Meteor.user()&& (Meteor.user().profile.role == "admin" ? navigation.navigate('Ubicacion') : navigation.navigate('PeliculasVideos', { item: Meteor.userId() }))

    this.state = {
      ipserver: 'vidkar.ddns.net',
      username: '',
      password: '',
      // isDarkMode: useColorScheme,
    };
  }

  onLogin() {
    const {username, password} = this.state;
    const {navigation} = this.props;
    try {
    } catch (error) {
      Alert.alert(
        'Error de Conexión',
        'No se pudo conectar al servidor: ' + this.state.ipserver,
      );
    }
    // Note the /websocket after your URL

    // let version = 1
    // Meteor.subscribe('mensajes');
    // console.log(Mensajes.find({type:'version'}).fetch());
    // Mensajes.findOne({type:'version'}).version > version ? Alert.alert("Nueva Actualización", "Existe una nueva Actualizacion de la APK. Actualícela porfavor!!!\n\nMejoras:\n " +  Mensajes.findOne({type:'version'}).cambios):
    // navigation.navigate('Peliculas')
    Meteor.loginWithPassword(username, password, function (error) {
      error && Alert.alert('Credenciales incorrectas');
      // !error && navigation.navigate('Peliculas');
      !error && navigation.navigate('Pedidos');
    });
  }

  render() {
    // Meteor.userId()&&Meteor.subscribe("usersId",Meteor.userId())

    const backgroundStyle = {
      // backgroundColor: this.state.isDarkMode ? Colors.darker : Colors.lighter,
      height: screenHeight,
      width: screenWidth,
      position: 'absolute',
      paddingTop: 50,
    };

    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Video
          source={require('../videobackground/background.mp4')}
          style={{
            backgroundColor: 'black',
            width: screenWidth,
            height: screenHeight,
            position: 'relative',
            left: 0,
            top: 0,
            zIndex: 0,
          }}
          muted={true}
          repeat={true}
          resizeMode={'cover'}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        />
        <View style={backgroundStyle}>
          {/* <HeroBot/> */}
          <View style={styles.container}>
            {/* <Text name="home-account" style={{fontSize: 40,color:"white"}}> */}
            <IconButton
              mode="outlined"
              icon="home-account"
              size={100}
              iconColor="white"
            />
            {/* </Text> */}

            <Text style={{fontSize: 40, color: 'white'}}>🅡🅘🅓🅔🅡 🅚🅐🅡</Text>
          </View>

          <View style={styles.container}>
            {/* <TextInput
              mode="outlined"
              value={this.state.ipserver}
              onChangeText={ipserver => this.setState({ipserver: ipserver})}
              label={'Dirección del Servidor'}
              // placeholderTextColor={
              //   !this.state.isDarkMode ? Colors.darker : Colors.lighter
              // }
              dense={true}
              style={{
                width: 200,
                // height: 44,
                marginBottom: 10,
              }}
            /> */}
            <TextInput
              mode="flat"
              value={this.state.username}
              onChangeText={username => this.setState({username: username})}
              label={'Username'}
              // placeholderTextColor={
              //   !this.state.isDarkMode ? Colors.darker : Colors.lighter
              // }
              dense={true}
              style={{
                width: 200,
                // height: 44,
                marginBottom: 10,
              }}
            />
            <TextInput
              mode="flat"
              value={this.state.password}
              onChangeText={password => this.setState({password: password})}
              label={'Password'}
              // placeholderTextColor={
              //   !this.state.isDarkMode ? Colors.darker : Colors.lighter
              // }
              secureTextEntry={true}
              dense={true}
              style={{
                width: 200,
                // height: 44,
                marginBottom: 10,
              }}
            />

            <Button mode="contained" onPress={this.onLogin.bind(this)}>
              Iniciar Sessión
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}
// const Loguin = withTracker(navigation => {
//   return {
//     navigation,
//   };
// })(MyAppLoguin);

export default Loguin;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    // backgroundColor: '#ecf0f1',
  },
});
// cual es este tipo de letra 🅘
