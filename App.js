
import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import RegisterScreen from './Src/Components/RegisterScreen';
import HomeScreen from './Src/Components/HomeScreen';
import Permission from './Src/Components/Permission';
import DisplayVideo from './Src/Components/DisplayVideo';

const HomeStack = createStackNavigator();

const App = () => {

  const ScreenStack = () => {
    return(
    <HomeStack.Navigator>
    {/* <HomeStack.Screen 
    options = {{headerShown: false}} 
    name = "Permission" component = {Permission}/> */}
    <HomeStack.Screen name = "Register" component = {RegisterScreen} options = {{title: 'Video'}}/>
    <HomeStack.Screen options = {{headerShown: false}}  name = "Home" component = {HomeScreen}/>
    
    <HomeStack.Screen name = "DisplayVideo" component = {DisplayVideo}/>
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
