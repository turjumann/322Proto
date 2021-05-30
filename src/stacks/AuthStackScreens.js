import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

export default function AuthStackScreens() {
    const AuthStack = createStackNavigator()
    return (
      <AuthStack.Navigator headerMode = 'none'>
          <AuthStack.Screen name = "Login" component = {LoginScreen} />
          <AuthStack.Screen name = "Register" component = {RegisterScreen} />
      </AuthStack.Navigator>
    )
}
