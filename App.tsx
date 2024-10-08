import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SplashScreen } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigators/MainNavigator';

const App = () => {

  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent/>
      {isShowSplash ? 
        (<SplashScreen/>):(<NavigationContainer><MainNavigator/></NavigationContainer>) }
    </> 
  )
}

export default App
