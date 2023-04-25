
import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import RegisterScreen from './Src/Components/VideoScreen';
import HomeScreen from './Src/Components/HomeScreen';
import DisplayVideo from './Src/Components/DisplayVideo';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const HomeStack = createStackNavigator();

const App = () => {

  const ScreenStack = () => {
    return(
    <HomeStack.Navigator>
   
    <HomeStack.Screen name = "Register" component = {RegisterScreen} options = {{title: 'Video'}}/>
    <HomeStack.Screen options = {{headerShown: false}}  name = "Home" component = {HomeScreen}/>
    
    <HomeStack.Screen name = "DisplayVideo" component = {DisplayVideo} options = {{headerShown: false}}/>
    </HomeStack.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <ScreenStack/>
    </NavigationContainer>
  )
 

}
export default App;
