import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Meteor, {withTracker} from '@meteorrn/core';
import {
    ProductosCollection,
  VentasAsignadasCollection,
  VentasCollection,
} from '../../collections/collections';
import {Text} from 'react-native-paper';
import CardPedidos from './CardPedidos';

const App = props => {
  // Set an initializing state whilst Firebase connects
  const {ready, ventas} = props;
  useEffect(() => {}, []);

  return (
    <View style={{padding: 12, }}>
      {/* <Text>{JSON.stringify(ventas)}</Text> */}

      {ready ? (
        ventas ? (
          ventas.map((pedido, index) => {
            return (
              <View>
                <CardPedidos pedido={pedido.venta} idPedido={pedido.idPedido} />
                {/* <Text key={index}>{pedido && pedido._id}</Text> */}
              </View>
            );
          })
        ) : (
          <Text>No hay pedidos</Text>
        )
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
};

export default HomePedidos = withTracker(props => {
  !Meteor.user() && props.navigation.navigate('Login');

  let ready = Meteor.subscribe('pedidosAsignados', {
    userId: Meteor.userId(),
  }).ready();
  
  let ventas = VentasAsignadasCollection.find({userId: Meteor.userId()}).map(
    pedidos => {
        console.log(pedidos);
      Meteor.subscribe('ventas', {_id: pedidos.idVentas}).ready();
      let venta = VentasCollection.findOne({_id: pedidos.idVentas})

      Meteor.subscribe('productos',{_id:venta.idProducto}).ready();
    //   let producto = ProductosCollection.findOne({_id:venta.idProducto})

    //   console.log("producto",venta);
    //   console.log(venta.producto);
      return {
        idPedido: pedidos._id,
        venta,
      };
    },
  );
  //   console.log(pedidos);

  return {
    ready,
    ventas,
    ...props,
  };
})(App);

const style = StyleSheet.create({
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  inputText: {
    color: 'black',
  },
});
