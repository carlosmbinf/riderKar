import * as React from 'react';
import { Avatar, Button, Card, IconButton, Text } from 'react-native-paper';
import Meteor, {withTracker} from '@meteorrn/core';
import MapsToPedidos from '../Maps/MapsToPedidos';
import {Linking} from 'react-native';

const LeftContent = props => <Avatar.Icon {...props} icon="store-check-outline" />



const cancelarPedido = (idPedido, idCadete) => {
    Meteor.call('cancelarPedidos', idPedido,idCadete, function(error, success) { 
        if (error) { 
            console.log('error', error); 
        } 
        if (success) { 
             
        } 
    });

}

const avanzarPedido = (idPedido, idCadete) => {
  Meteor.call('avanzarPedidos', idPedido,idCadete, function(error, success) { 
      if (error) { 
          console.log('error', error); 
      } 
      if (success) { 
           
      } 
  });

}
const goToLocation = (latitude, longitude) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  Linking.openURL(url);
}

const CardPedidos = ({pedido, idPedido}) => {
    const [urlImg, setUrlImg] = React.useState('');
    const [buttonAvanzarPedido, setButtonAvanzarPedido] = React.useState('');
    console.log(pedido);
    let tienda = pedido && pedido.tienda && pedido.tienda
    let producto= pedido && pedido.producto && pedido.producto
    
    React.useEffect(()=>{
        let ready = producto&&producto._id&&Meteor.subscribe('files.images.all', {
            "meta.idProducto": pedido.idProducto,
          }).ready();
          // pedido.idProducto && Meteor.call("findImgbyProduct",pedido.idProducto,(error,link)=>setUrlImg(link))
        // console.log(urlImg);

          switch (pedido.status) {
            case 'PREPARANDO':
              setButtonAvanzarPedido('LLEGUE AL LOCAL');
              break;
            case 'CADETEENLOCAL':
              setButtonAvanzarPedido('TENGO EL PEDIDO');
              break;
            case 'ENCAMINO':
              setButtonAvanzarPedido('LLEGUE AL DESTINO');
              break;
            case 'CADETEENDESTINO':
              setButtonAvanzarPedido('ENTREGADO');
              break;

            default:
              setButtonAvanzarPedido('ENTREGADO');
              break;
          }
          
    })
  return (
    <Card>
      <Card.Title
        title={tienda && tienda.title}
        subtitle={tienda && tienda.descripcion}
        left={LeftContent}
      />
      <Card.Content style={{paddingBottom: 15}}>
        <Text variant="titleLarge">{producto && producto.name}</Text>
        <Text variant="bodyLarge">{producto && producto.descripcion}</Text>
        <Text variant="bodySmall">{producto && producto.comentario}</Text>
      </Card.Content>
      {tienda && <MapsToPedidos tienda={tienda} />}

      {/* {urlImg && <Card.Cover source={{uri: urlImg}} />} */}
      <Card.Content style={{paddingTop: 15}}>
        <Text variant="titleLarge">Nota:</Text>
        <Text variant="bodyLarge">{pedido && pedido.comentario}</Text>
      </Card.Content>
      <Card.Actions>
      <IconButton icon='map-marker-radius' onPress={() => goToLocation(tienda.coordenadas.latitude, tienda.coordenadas.longitude)}></IconButton>
      {/* <Button mode='contained' onPress={() => goToLocation(tienda.coordenadas.latitude, tienda.coordenadas.longitude)}>
          
        </Button> */}
        <Button disabled={pedido.status!="PREPARANDO"} onPress={() => cancelarPedido(idPedido, Meteor.userId())}>
          Cancel
        </Button>
        <Button mode='contained' onPress={() => avanzarPedido(idPedido, Meteor.userId())}>
          {buttonAvanzarPedido}
        </Button>
      </Card.Actions>
    </Card>
  );
}

export default CardPedidos;