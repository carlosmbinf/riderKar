import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Alert,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Text, Stack} from '@react-native-material/core';
import MapView, {
  Circle,
  Heatmap,
  MapMarker,
  Marker,
  MarkerAnimated,
  Polygon,
} from 'react-native-maps';
import {enableLatestRenderer} from 'react-native-maps';
const ubi = require('./ubi.png');

import Meteor, {Mongo, withTracker} from '@meteorrn/core';
import {TiendasCollection} from '../../collections';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';

class App extends Component {
  state = {
    coordenadasMarker: {
      latitude: -34.8553419,
      longitude: -56.1918985,
    },
    coordenadas: {
      latitude: -34.83533982331194,
      latitudeDelta: 0.007044682292921323,
      longitude: -56.191895473748446,
      longitudeDelta: 0.01765664666891098,
    },
    region: {
      latitude: -34.83533982331194,
      latitudeDelta: 0.007044682292921323,
      longitude: -56.193895473748446,
      longitudeDelta: 0.03765664666891098,
    },
    x: {
      latitude: -34.8353419,
      longitude: -56.1918985,
    },
  };

  requestLocationPermission = async () => {
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
            this.setState({coordenadas});
            const coordenadas = posicion.coords;
            console.log(coordenadas);
            this.setState({
              coordenadas: {
                latitude: coordenadas.latitude,
                longitude: coordenadas.longitude,
              },
            });
            console.log('speed', coordenadas.speed);

            Meteor.call("calcularDistancia", -34.90002172417658, -56.190842720394116, coordenadas.latitude, coordenadas.longitude,(error, result)=>{
              console.log('DISTANCIA:', result, "KM");
              // this.setState({speed: coordenadas.speed});
              this.setState({speed: result});

            })
            
          },
          error => Alert.alert(error.message),
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  componentDidUpdate = () => {
    // console.log(Meteor.status());
  };
  componentDidMount = () => {
    // Meteor.call('addUser', 
    // { 
    //   email: "carlosmbinf@gmail.com",
    //   password: "123"
    // }, function(error, success) { 
    //   if (error) { 
    //     Alert.alert('error', error); 
    //   } 
    //   if (success) { 
    //      Alert.alert("OK", success)
    //   } 
    // });
    // Meteor.reconnect()
    this.requestLocationPermission();
    // this.centroUbicacionLocalYMaker(this.state.coordenadas, this.state.coordenadasMarker)
  };

  // componentDidUpdate = () =>{
  //     this.centroUbicacionLocalYMaker(this.state.coordenadas, this.state.coordenadasMarker)
  // }

  centroUbicacionLocalYMaker = (ubicOne, ubiTwo) => {
    let region = this.state.region;
    region.latitude =
      ubicOne.latitude - (ubicOne.latitude - ubiTwo.latitude) / 2;
    region.longitude =
      ubicOne.longitude - (ubicOne.longitude - ubiTwo.longitude) / 2;

    this.setState({region});

    // coordenadas: {
    //     "latitude": -34.83533982331194,
    //     "latitudeDelta": 0.007044682292921323,
    //     "longitude": -56.191895473748446,
    //     "longitudeDelta": 0.01765664666891098
    // },
  };

  actualizarUbicacionUser = coordinate => {
    let region = {};
    region.latitudeDelta = this.state.region.latitudeDelta;
    region.longitudeDelta = this.state.region.longitudeDelta;
    region.latitude = coordinate.latitude;
    region.longitude = coordinate.longitude;
    this.setState({region});
    console.log('Actualizando');
  };

  render() {
    const {tiendas, readyMarkers} = this.props;
    // enableLatestRenderer();
    return (
      <>
        <View style={estilos.contenedor}>
          <TouchableOpacity onPress={this.requestLocationPermission}>
            <Text style={estilos.texto}>Velocidad = {Number(this.state.speed).toFixed(2)}KM/h</Text>
            <Text>
              Ubicación: {JSON.stringify(this.state.coordenadasMarker)}
            </Text>
          </TouchableOpacity>
          <Icon.Button
    name="facebook"
    backgroundColor="#3b5998"
    onPress={()=>console.log("HOLA")}
  ></Icon.Button>
          <Button icon="home" mode="contained" onPress={() => console.log('Pressed')}>
    Press me
  </Button>
        </View>
        <View style={estilos.mapa}>
          {/* {this.state.coordenadas &&this.state.coordenadas.longitude && this.state.coordenadas.latitude ? */}
          <MapView
            maxZoomLevel={17}
            showsUserLocation={true}
            showsMyLocationButton
            onUserLocationChange={location => this.requestLocationPermission()}
            // onUserLocationChange={location => this.actualizarUbicacionUser(location.nativeEvent.coordinate)}

            region={this.state.region}
            onRegionChangeComplete={(region, detalles) => {
              this.setState(region);
            }}
            // liteMode
            // showsTraffic
            key="prueba"
            initialRegion={this.state.coordenadas}
            //   region={this.state.coordenadas}
            // onRegionChange={region => this.setState({ region })}
            style={estilos.map}
            loadingEnabled={true}
            customMapStyle={[
              {
                featureType: 'poi',
                stylers: [
                  {
                    visibility: 'off',
                  },
                ],
              },
            ]}>
              {tiendas.map((element) => console.log(element._id) )}
            {tiendas.map((element) =>            
              <Marker
                key={element._id}
                coordinate={{
                  latitude: element.coordenadas.latitude,
                  longitude: element.coordenadas.longitude,
                }}
                title={element.title}
                description={element.descripcion}
                // draggable
                // onDragEnd={(coord) => { console.log(coord.nativeEvent.coordinate); this.setState({ coordenadasMarker: coord.nativeEvent.coordinate }) }}
                // image={ubi}
                pinColor={element.pinColor?element.pinColor:"red"} // Change the color by setting the pinColor prop
                // style={{width:10,height:10}}
              />                
              // </Marker>
            )}
            {tiendas.map((element) =>            
              <Heatmap
              points={[{
                latitude: element.coordenadas.latitude,
                longitude: element.coordenadas.longitude,
              }]}
              radius={40}
              gradient={{
                colors: ['purple', 'red'],
                startPoints: [0.1, 0.5],
                colorMapSize: 2000,
              }}
            />
            )}
            
          </MapView>

          {/* :<></>} */}
        </View>
      </>
    );
  }
}

const estilos = StyleSheet.create({
  mapa: {
    width: '100%',
    height: 300,
  },
  contenedor: {
    bottom: 10,
    left: 10,
    zIndex: 1,
    direction: 'absolute',
    maxHeight: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e7ea',
  },
  contenedorPrincipal: {
    // top:100,
    // left:100,
    // zIndex:1,
    // direction:"absolute",
    height: '100%',
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: '#e1e7ea',
  },
  texto: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 2,
  },
});

let Ubicacion = withTracker(() => {
  let readyMarkers = Meteor.subscribe('tiendas', {}).ready();
  let tiendas = TiendasCollection.find({});
  console.log(tiendas);
  return {
    readyMarkers,
    tiendas,
  };
})(App);

export default Ubicacion;
