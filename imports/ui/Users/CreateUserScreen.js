import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const CreateUserScreen = () => {
  const [nameUser, setNameUser] = useState();
  const [emailUser, setEmailUser] = useState();
  const [phoneUser, setPhoneUser] = useState();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor:
      // isDarkMode
      false ? Colors.darker : Colors.lighter,
  };

  const createNewUser = async () => {
    if (nameUser && emailUser && phoneUser) {
      console.log(nameUser);
    } else {
      console.log(Alert.alert('ALERT', 'LLENE TODOS LOS DATOS'));
    }
  };

  return (
    <SafeAreaView
    // style={backgroundStyle}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      // backgroundColor={backgroundStyle.backgroundColor}
      />

      <ScrollView>
        <View style={style.inputGroup}>
          <TextInput
            value={nameUser}
            onChangeText={value => setNameUser(value)}
            style={style.inputText}
            placeholderTextColor={'#cccccc'}
            placeholder="Name User"></TextInput>
        </View>
        <View style={style.inputGroup}>
          <TextInput
            value={emailUser}
            onChangeText={value => setEmailUser(value)}
            style={style.inputText}
            placeholderTextColor={'#cccccc'}
            placeholder="Email User"></TextInput>
        </View>
        <View style={style.inputGroup}>
          <TextInput
            value={phoneUser}
            onChangeText={value => setPhoneUser(value)}
            style={style.inputText}
            placeholderTextColor={'#cccccc'}
            placeholder="Phone User"></TextInput>
        </View>
        <View style={style.inputGroup}>
          <Button title="Save User" onPress={() => createNewUser()}></Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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

export default CreateUserScreen;
