import { Text } from '@react-native-material/core';
import React, { useState } from 'react';
import MapView, { Camera, Callout, Circle, Heatmap, Marker, Polygon, Polyline, UrlTile } from 'react-native-maps';

export default Map = () => {
  const [speed, setSpeed] = useState(0);

  const onRegionChange = (region) => {
    const currentSpeed = Math.sqrt(Math.pow(region.latitudeDelta, 2) + Math.pow(region.longitudeDelta, 2));
    
    if (currentSpeed !== speed) {
      setSpeed(currentSpeed);
    }
  };

  const getZoomLevel = () => {
    if (speed >= 0 && speed <= 0.5) {
      return 14;
    } else if (speed > 0.5 && speed <= 2) {
      return 12;
    } else if (speed > 2 && speed <= 5) {
      return 10;
    } else {
      return 8;
    }
  };

  return (
    <MapView onRegionChange={onRegionChange} zoomEnabled={false} scrollEnabled={false} style={{flex: 1}}>
      <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
      <Circle center={{ latitude: 37.78825, longitude: -122.4324 }} radius={1000} />
      <Polyline coordinates={[{ latitude: 37.78825, longitude: -122.4324 }, { latitude: 37.78825, longitude: -122.4324 }]} />
      <Polygon coordinates={[{ latitude: 37.78825, longitude: -122.4324 }, { latitude: 37.78825, longitude: -122.4324 }]} />
      <TileOverlay urlTemplate={'http://...'}/>
      <UrlTile urlTemplate={'http://...'}/>
      <Heatmap points={[{ latitude: 37.78825, longitude: -122.4324 }, { latitude: 37.78825, longitude: -122.4324 }]}/>
      <Callout tooltip={true}>
        <View>
          <Text>This is a tooltip</Text>
        </View>
      </Callout>
      <Camera
        zoom={getZoomLevel()}
        center={{ latitude: 37.78825, longitude: -122.4324 }}
      />
    </MapView>
  );
};