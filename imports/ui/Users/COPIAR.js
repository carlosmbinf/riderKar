import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {withTracker} from '@meteorrn/core';

const App = props => {
  // Set an initializing state whilst Firebase connects

  useEffect(() => {}, []);

  return <></>;
};

export default Name = withTracker((props) => {
  !Meteor.user() && props.navigation.navigate('Login');

  let ready = Meteor.subscribe('tiendas', {}).ready();
  let tiendas = TiendasCollection.find({});
  console.log(tiendas);


  return {
    ready,
    tiendas,
    ...props 
  };
})(NAME);

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
