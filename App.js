import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { UserProvider } from './src/context/UserContext'
import { FirebaseProvider } from './src/context/FirebaseContext'
import AppStackScreens from './src/stacks/AppStackScreens'

//Wrapping NavigationContainer with FirebaseProvider and UserProvider gives a white blank screen

export default App = () => {
  return (
    <FirebaseProvider>
    <UserProvider>
      <NavigationContainer>
          <AppStackScreens />
      </NavigationContainer>
    </UserProvider>
    </FirebaseProvider>
  )
}
as