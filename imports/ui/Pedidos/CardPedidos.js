import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import Meteor, {withTracker} from '@meteorrn/core';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const cancelarPedido = (idPedido, idCadete) => {
    Meteor.call('cancelarPedidos', idPedido,idCadete, function(error, success) { 
        if (error) { 
            console.log('error', error); 
        } 
        if (success) { 
             
        } 
    });

}
const CardPedidos = ({pedido, idPedido}) => {
    const [urlImg, setUrlImg] = React.useState('');
    console.log(pedido);
    let tienda = pedido && pedido.tienda && pedido.tienda
    let producto= pedido && pedido.producto && pedido.producto
    
    React.useEffect(()=>{
        let ready = producto&&producto._id&&Meteor.subscribe('files.images.all', {
            "meta.idProducto": pedido.idProducto,
          }).ready();
          pedido.idProducto && Meteor.call("findImgbyProduct",pedido.idProducto,(error,link)=>setUrlImg(link))
        // console.log(urlImg);
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
        <Text variant="bodyMedium">{producto && producto.comentario}</Text>
      </Card.Content>
      <Card.Content>
        <Text variant="titleLarge">Nota:</Text>
        <Text variant="bodyMedium">{pedido && pedido.comentario}</Text>
      </Card.Content>
      {urlImg&&<Card.Cover source={{uri: urlImg}} />}

      <Card.Actions>
        <Button onPress={() => cancelarPedido(idPedido, Meteor.userId())}>
          Cancel
        </Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
}

export default CardPedidos;