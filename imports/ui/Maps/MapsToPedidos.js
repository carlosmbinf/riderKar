import React, {useState} from 'react';
import MapView, {
  Camera,
  Callout,
  Circle,
  Heatmap,
  Marker,
  Polygon,
  Polyline,
  UrlTile,
} from 'react-native-maps';
import {Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const calculateRegion = coordinates => {
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = 0.01;

  let minLat = coordinates.latitude;
  let maxLat = coordinates.latitude;
  let minLong = coordinates.longitude;
  let maxLong = coordinates.longitude;

  const {latitude, longitude} = coordinates;
  minLat = Math.min(minLat, latitude);
  maxLat = Math.max(maxLat, latitude);
  minLong = Math.min(minLong, longitude);
  maxLong = Math.max(maxLong, longitude);

  const latitudeDelta = maxLat - minLat + 2 * LATITUDE_DELTA;
  const longitudeDelta = maxLong - minLong + 2 * LONGITUDE_DELTA;

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLong + maxLong) / 2,
    latitudeDelta,
    longitudeDelta,
  };
};

const calculateRegionCenter = (myLat, myLong, shopLat, shopLong) => {
  const LATITUDE_DELTA = 0.00922;
  const LONGITUDE_DELTA = 0.00421;

  const lat1 = myLat;
  const lat2 = shopLat;
  const lon1 = myLong;
  const lon2 = shopLong;

  const distanceLat = lat2 - lat1;
  const distanceLong = lon2 - lon1;

  const centerLat = (lat1 + lat2) / 2;
  const centerLong = (lon1 + lon2) / 2;

  const latDelta = Math.abs(LATITUDE_DELTA / distanceLat);
  const longDelta = Math.abs(LONGITUDE_DELTA / distanceLong);

  return {
    latitude: centerLat,
    longitude: centerLong,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
  };
};



export default MapsToPedidos = ({puntoAIr}) => {
  const [speed, setSpeed] = useState(0);
  const [coordenadas, setCoordenadas] = useState(0);
  const [region, setRegion] = useState(
    calculateRegion(puntoAIr.coordenadas || puntoAIr.cordenadas),
  );
  let to = puntoAIr.coordenadas || puntoAIr.cordenadas;
  const onRegionChange = region => {
    const currentSpeed = Math.sqrt(
      Math.pow(region.latitudeDelta, 2) + Math.pow(region.longitudeDelta, 2),
    );

    if (currentSpeed !== speed) {
      setSpeed(currentSpeed);
    }
  };

  return (
    <MapView
      // maxZoomLevel={17}
      showsUserLocation={true}
      showsMyLocationButton
      // onUserLocationChange={location => this.requestLocationPermission()}
      onUserLocationChange={
        location => {
          let yo = location.nativeEvent.coordinate
          yo.lalitude && yo.longitude &&
          puntoAIr.latitude &&
          puntoAIr.longitude && setRegion(
            calculateRegionCenter(
              yo.lalitude,
              yo.longitude,
              puntoAIr.latitude,
              puntoAIr.longitude
            ),
          );
        }
        // this.actualizarUbicacionUser(location.nativeEvent.coordinate)
      }
      // region={region}
      // onRegionChangeComplete={(region, detalles) => {
      //   setRegion(region);
      // }}
      // liteMode
      // showsTraffic
      key="prueba"
      initialRegion={region}
      //   region={region}
      // onRegionChange={region => setRegion({ region })}
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
      <Marker
        title={puntoAIr.title || puntoAIr.name}
        description={puntoAIr.descripcion}
        coordinate={{latitude: to.latitude, longitude: to.longitude}}
      />
    </MapView>
  );
  // return (
  //   <MapView
  //     onRegionChange={onRegionChange}
  //     zoomEnabled={false}
  //     scrollEnabled={false}
  //     style={{flex: 1}}>
  //     <Marker coordinate={{latitude: 37.78825, longitude: -122.4324}} />
  //     <Circle
  //       center={{latitude: 37.78825, longitude: -122.4324}}
  //       radius={1000}
  //     />
  //     <Polyline
  //       coordinates={[
  //         {latitude: 37.78825, longitude: -122.4324},
  //         {latitude: 37.78825, longitude: -122.4324},
  //       ]}
  //     />
  //     <Polygon
  //       coordinates={[
  //         {latitude: 37.78825, longitude: -122.4324},
  //         {latitude: 37.78825, longitude: -122.4324},
  //       ]}
  //     />
  //     <TileOverlay urlTemplate={'http://...'} />
  //     <UrlTile urlTemplate={'http://...'} />
  //     <Heatmap
  //       points={[
  //         {latitude: 37.78825, longitude: -122.4324},
  //         {latitude: 37.78825, longitude: -122.4324},
  //       ]}
  //     />
  //     <Callout tooltip={true}>
  //       <View>
  //         <Text>This is a tooltip</Text>
  //       </View>
  //     </Callout>
  //     <Camera
  //       zoom={getZoomLevel()}
  //       center={{latitude: 37.78825, longitude: -122.4324}}
  //     />
  //   </MapView>
  // );
};

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
    height: 200,
    borderRadius: 22,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 2,
  },
});
// como calcular la longitudDelta y la latitudDelta segun unas coordenadas, pues el campo region que necesita react-native-maps, necesita esos valores y no se como obtenerlos, solo tengo las coordenadas mias y la de la tienda, quiero que ambos se muestren en el centro del mapa
// Como puedo crear un intent en react-native para que me haga ir a una direccion pasando la longitud y la latitud
