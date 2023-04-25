import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  useColorScheme,
  View,
  FlatList
 
} from 'react-native';
import Video from 'react-native-video';
import {  DocumentDirectoryPath, moveFile } from 'react-native-fs';

const RegisterScreen = ({navigation, route}) => {
  const url = route.params;
  const [videoPath, setVideoPath] = useState(null);
  const [files, setFiles] = useState([]);
  var RNFS = require('react-native-fs');

    
    useEffect(() => {
      const path = RNFS.ExternalDirectoryPath; // or any other directory path
      RNFS.readDir(path)
        .then((result) => {
          // console.log("result", result)
          setFiles(result);
          console.log(file)
        })
        .catch((err) => {
          console.log(err.message, err.code);
        });
    });
  
    const seperator = () => {
      return (
          <View style={styles.seperator} />
      )
  }

  return(
    <View style = {styles.container}>
      <FlatList
        data = {files}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => {
          return(
            <TouchableOpacity style = {styles.displayVideo} onPress = {() => navigation.navigate('DisplayVideo', {item})}>
            <Text style = {{ top: 5 }}>{item.name}</Text>
            </TouchableOpacity>
            )
          }}
        legacyImplementation={true}
        // ListHeaderComponent = {renderHeader}
        extraData = {files}
        ItemSeparatorComponent = {seperator}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <View style = {styles.button}>
      <Text>Record</Text>
      </View>
      </TouchableOpacity>
    </View>
  )
}
export default RegisterScreen;


const styles = StyleSheet.create({
  input : {
    height: 40,
    width: 300,
    // alignItems: 'center',
    marginBottom: 10,
    color: '#307ecc',
    
    borderRadius: 30,
    backgroundColor: 'skyblue',
    margin: 10,
    padding: 8,
    borderRadius: 14,
    fontSize: 18,
   
  },
  seperator: {
    width: 400,
    height: 5,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center'
  },
button : {
  height: 40,
  width: 150,
  // alignItems: 'center',
  marginBottom: 10,
  color: '#307ecc',
  // borderRadius: 30,
  backgroundColor: 'red',
  margin: 10,
  padding: 8,
  borderRadius: 14,
  fontSize: 20,
  alignItems: 'center'
},
video:{
  flex:1
},
displayVideo: {
  height: 30,
 
}


});

