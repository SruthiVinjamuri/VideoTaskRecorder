import React, { useState, useFocusEffect, useEffect, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text, ViewProps, ToastAndroid } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import Video from 'react-native-video';

const Permission = ({navigation, route}) => {
const url = route.params;
console.log("url", url);
  return(
    <View style={styles.container}>
    <View style={styles.permissionsContainer}>
    
    
  <TouchableHighlight onPress={() => navigation.navigate('Register')}>
  <View style = {styles.button}>
  <Text>Watch</Text>
  </View>
  </TouchableHighlight>

  <TouchableHighlight onPress={() => navigation.navigate('Home')}>
  <View style = {styles.button}>
  <Text>Record</Text>
  </View>
  </TouchableHighlight>
</View>
</View>
  )
}

const styles = StyleSheet.create({
    welcome: {
      fontSize: 38,
      fontWeight: 'bold',
      maxWidth: '80%',
    },
   
    container: {
      flex: 1,
      backgroundColor: 'red',
   
    },
    permissionsContainer: {
      marginTop:  12,
    },
    permissionText: {
      fontSize: 17,
    },
    hyperlink: {
      color: '#007aff',
      fontWeight: 'bold',
    },
    bold: {
      fontWeight: 'bold',
    },
    button : {
      height: 40,
      width: 150,
      // alignItems: 'center',
      marginBottom: 10,
      color: '#307ecc',
      borderRadius: 30,
      backgroundColor: 'skyblue',
      margin: 10,
      padding: 8,
      borderRadius: 14,
      fontSize: 18,
      alignItems: 'center'
    }
  });

export default Permission;